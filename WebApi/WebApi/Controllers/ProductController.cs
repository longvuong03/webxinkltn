using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using WebApi.Models.DTO;
using WebApi.Services;
namespace WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly ProductService productService;
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context, ProductService productService)
        {
            _context = context;
            this.productService = productService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Products>>> GetProducts(int page = 1)
        {
            const int pageSize = 1000;
            var products = await _context.Product
                .OrderByDescending(p => p.id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return products;
        }
        [HttpPost("addProducts")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDTO productDto, IFormFile? imgFile)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is null.");
            }

            // Lấy thông tin cửa hàng của người dùng

            try
            {
                // Tạo đối tượng Product từ DTO
                var product = new Products
                {
                    
                    nameProduct = productDto.nameProduct,
                    description = productDto.description,
                    price = productDto.price,
                    quantity = productDto.quantity,
                    createdAt = DateTime.UtcNow,
                };

                // Xử lý file ảnh đại diện (avatar) nếu có
                if (imgFile != null)
                {
                    var fileExtension = Path.GetExtension(imgFile.FileName).ToLowerInvariant();
                    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };

                    if (!allowedExtensions.Contains(fileExtension))
                    {
                        return BadRequest("File extension is not allowed.");
                    }

                    // Chuyển file ảnh thành chuỗi Base64
                    var base64String = await ConvertToBase64StringAsync(imgFile);
                    product.img = base64String;
                }
                else
                {
                    product.img = "";  // Nếu không có ảnh thì gán giá trị rỗng
                }

                // Thêm sản phẩm vào database
                await productService.AddProductAsync(product);



                return Ok(new { message = "Product added successfully." });
            }
            catch (Exception ex)
            {
                // Log lỗi và trả về lỗi server
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("updateProduct")]
        public async Task<IActionResult> UpdateProduct([FromForm] ProductDTO productDto, IFormFile? imgFile)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is null.");
            }

            try
            {
                // Lấy sản phẩm từ cơ sở dữ liệu bằng ID
                var existingProduct = await productService.GetProductByIdAsync(productDto.id);
                if (existingProduct == null)
                {
                    return NotFound("Product not found.");
                }

                // Cập nhật các thuộc tính của sản phẩm
                existingProduct.nameProduct = productDto.nameProduct;
                existingProduct.description = productDto.description;
                existingProduct.price = productDto.price;
                existingProduct.quantity = productDto.quantity;

                // Xử lý file ảnh đại diện (avatar) nếu có
                if (imgFile != null)
                {
                    var fileExtension = Path.GetExtension(imgFile.FileName).ToLowerInvariant();
                    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };

                    if (!allowedExtensions.Contains(fileExtension))
                    {
                        return BadRequest("File extension is not allowed.");
                    }

                    // Chuyển file ảnh thành chuỗi Base64
                    var base64String = await ConvertToBase64StringAsync(imgFile);
                    existingProduct.img = base64String;
                }

                // Cập nhật sản phẩm vào cơ sở dữ liệu
                await productService.UpdateProductAsync(existingProduct);

                return Ok(new { message = "Product updated successfully." });
            }
            catch (Exception ex)
            {
                // Log lỗi và trả về lỗi server
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // Phương thức chuyển file thành chuỗi Base64
        private async Task<string> ConvertToBase64StringAsync(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var fileBytes = memoryStream.ToArray();
            var base64String = Convert.ToBase64String(fileBytes);
            return $"data:{file.ContentType};base64,{base64String}";
        }


        [HttpPost]
        public async Task<ActionResult<Products>> AddProduct(Products products)
        {
            if (ModelState.IsValid)
            {

                _context.Product.Add(products);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetProducts), new { id = products.id }, products);
            }
            return BadRequest(ModelState);
        }


        
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        [HttpGet]
        [Route("getbyidProduct/{id}")]
        public async Task<IActionResult> GetByIdUser(int id)
        {
            var user = await _context.Product.FindAsync(id);
            return Ok(user);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound(); // Đảm bảo rằng bạn trả về 404 nếu sản phẩm không tìm thấy
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent(); // Hoặc Ok() tùy theo yêu cầu của bạn
        }
        [HttpPost]
        [Route("editProduct")]
        public IActionResult Edit(Products product)
        {

            _context.Product.Update(product);
            _context.SaveChanges();
            return Ok(product);
        }


    }
}
