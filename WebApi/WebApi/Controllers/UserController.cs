using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<ChatHub> _hubContext;

        public UserController(ApplicationDbContext context, IHubContext<ChatHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        [HttpPost("sendmessage")]
        /*     public async Task<IActionResult> SendMessage(ChatMessage message)
             {
                 _context.ChatMessages.Add(new ChatMessage { User = message.User, Message = message.Message });
                 await _context.SaveChangesAsync();
                 await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.User, message.Message);
                 return Ok();
             }
             [HttpGet("messages")]
             public async Task<IActionResult> GetMessages()
             {
                 var messages = await _context.ChatMessages.ToListAsync();
                 return Ok(messages);
             }*/

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUser(int page = 1)
        {
            const int pageSize = 10;
            var users = await _context.Users
                .OrderByDescending(u => u.id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return users;
        }



        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User usermodel)
        {
            if (ModelState.IsValid)
            {

                _context.Users.Add(usermodel);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetAllUser), new { id = usermodel.id }, usermodel);
            }
            return BadRequest(ModelState);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpGet]
        [Route("getbyiduser/{id}")]
        public async Task<IActionResult> GetByIdUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return Ok(user);
        }

        [HttpPost]
        [Route("edituser")]
        public IActionResult Edit(User user)
        {
            //user.password = GetMD5(user.password);
            _context.Users.Update(user);
            _context.SaveChanges();
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserLoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var email = model.email;
            var password = GetMD5(model.password); // Mã hóa mật khẩu nhập vào

            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == email && u.password == password);

            if (user == null)
            {
                return BadRequest(new { message = "Invalid email or password" });
            }

            return user;
        }


        /* [HttpPost("login")]
         public async Task<ActionResult<User>> Login(UserLoginModel model)
         {
             var user = await _context.Users.FirstOrDefaultAsync(u => u.email == model.email && u.password == model.password);

             if (user == null)
             {
                 return NotFound("Invalid email or password}");
             }

             return user;
         }*/

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.email == user.email);
                if (existingUser != null)
                {
                    return BadRequest("Email already exists");
                }

                // Mã hóa mật khẩu bằng MD5 trước khi lưu
                user.password = GetMD5(user.password);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(user);
            }

            return BadRequest(ModelState);
        }

        private string GetMD5(string input)
        {
            // MD5 hash generation logic
            using (var md5 = System.Security.Cryptography.MD5.Create())
            {
                var inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                var hashBytes = md5.ComputeHash(inputBytes);
                var sb = new System.Text.StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }
        public class UserLoginModel
        {
            public string email { get; set; }
            public string password { get; set; }
        }
        /*  public User CheckUserUsnamePass(string email, string password)
          {
              User user = _context.Users.FirstOrDefault(u => u.email == email && u.password == password);
              return user;
          }*/
    }

    }
