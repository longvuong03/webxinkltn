using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using WebApi.Models;
using WebApi.Services;
using static WebApi.Controllers.OrderController;
namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService cartService;
        private readonly CartDetailsService cartDetailsService;
        private readonly ProductService productService;
        public CartController(CartService cartService, CartDetailsService cartDetailsService, ProductService productService)
        {
            this.cartService = cartService;
            this.cartDetailsService = cartDetailsService;
            this.productService = productService;
        }
        [HttpGet("listcarrt")]
        public async Task<IActionResult> Listcarrt(int UserId)
        {
            Cart cart = await cartService.GetCartByUserIdAsync(UserId);

            List<CartDetail> cartDetails = new List<CartDetail>();

            // Nếu cart không null thì lấy danh sách chi tiết giỏ hàng
            if (cart != null)
            {
                cartDetails = await cartDetailsService.GetListCartDetailsAsync(cart.Id);
            }

            List<Modeldata> modeldatas = new List<Modeldata>();

            foreach (var item in cartDetails)
            {
                Products products = await productService.GetProductByIdAsync(item.ProductId);
                products.CartDetails = null;

                Modeldata modeldata = new Modeldata()
                {
                    CartDetail = item,
                    Products = products,
                };

                item.Product = null;
                item.Cart = null;
                modeldatas.Add(modeldata);
            }

            // Trả về danh sách modeldatas, nếu cart là null thì trả về danh sách rỗng
            return Ok(modeldatas);
        }
        public class PaymentRequests
        {
            public int id { get; set; }
            public string Email { get; set; }
        }
        [HttpPost("payment")]
        public async Task<IActionResult> Payment([FromBody] PaymentRequests paymentRequest)
        {
            // Lấy giỏ hàng dựa vào UserId
            Cart cart = await cartService.GetCartByUserIdAsync(paymentRequest.id);

            if (cart == null)
            {
                return BadRequest("Cart not found");
            }

            // Lấy danh sách CartDetails từ giỏ hàng
            var cartDetails = await cartDetailsService.GetListCartDetailsAsync(cart.Id);
            if (cartDetails == null || !cartDetails.Any())
            {
                return BadRequest("No cart details found.");
            }

            // Tính tổng giá trị giỏ hàng
            decimal totalCartPrice = cartDetails.Sum(cd => cd.TotalPrice.GetValueOrDefault());

            // Tạo bảng chi tiết sản phẩm
            string productDetailsTable = @"
    <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse;'>
        <thead>
            <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
            </tr>
        </thead>
        <tbody>";

            foreach (var detail in cartDetails)
            {
                var product = await productService.GetProductByIdAsync(detail.ProductId);

                productDetailsTable += $@"
        <tr>
            <td>{product.nameProduct}</td>
            <td>{detail.Quantity}</td>
            <td>{product.price}</td>
            <td>{detail.TotalPrice.GetValueOrDefault():C}</td>
        </tr>";
            }

            productDetailsTable += $@"
    </tbody>
    <tfoot>
        <tr>
            <td colspan='3'><strong>Tổng cộng</strong></td>
            <td><strong>{totalCartPrice:C}</strong></td>
        </tr>
    </tfoot>
</table>";

            // Tạo liên kết QR với tổng giá từ CartDetail
            string qrCodeUrl = $"https://api.qrserver.com/v1/create-qr-code/?data=UserId:{paymentRequest.id},Total:{totalCartPrice}&size=200x200";

            // Gửi email xác nhận
            var mailMessage = new MailMessage("longkg4@gmail.com", paymentRequest.Email)
            {
                Subject = "Cart Payment Confirmation",
                Body = $@"
        <h1>Thông tin giỏ hàng của bạn</h1>
        <h3>Chi tiết sản phẩm:</h3>
        {productDetailsTable}
        <p><strong>Tổng giá: {totalCartPrice:C}</strong></p>
        <p>Mã QR thanh toán:</p>
        <img src='{qrCodeUrl}' alt='QR Code'/>
        ",
                IsBodyHtml = true
            };

            using (var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("longkg4@gmail.com", "xede zsha jgws cojp"),
                EnableSsl = true,
            })
            {
                await smtpClient.SendMailAsync(mailMessage);
            }

            return Ok("Payment processed and email sent successfully.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            try
            {
                // Sử dụng CartService để xóa cart
                await cartDetailsService.DeleteCart(id); // Gọi phương thức xóa từ CartDetailsService
                return NoContent(); // Trả về mã trạng thái 204 No Content khi xóa thành công
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message); // Trả về mã trạng thái 404 Not Found nếu không tìm thấy mục để xóa
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // Trả về mã trạng thái 500 Internal Server Error cho các lỗi khác
            }
        }
        [HttpGet("deleteQuantitycart")]
        public async Task<IActionResult> DeleteQuantitycart(int UserId, int ProductId)
        {
            Cart cart = await cartService.GetCartByUserIdAsync(UserId);
            CartDetail cart1 = await cartDetailsService.GetCartDetailByCartIdAndProductIdAsync(cart.Id, ProductId);

            if (cart1 != null)
            {
                Products products = await productService.GetProductByIdAsync(ProductId);
                if (cart1.Quantity > 1)
                {
                    cart1.Quantity -= 1;
                    cart1.TotalPrice = cart1.Quantity * products.price;
                    await cartDetailsService.UpdateCartAsync(cart1);
                    products.quantity += 1;
                    await productService.UpdateProductAsync(products);
                }
                else if (cart1.Quantity == 1)
                {
                    await cartDetailsService.DeleteCart(cart1.Id);
                    products.quantity += 1;
                    await productService.UpdateProductAsync(products);
                }
            }

            return Ok("User added successfully.");
        }
        [HttpGet("addQuantitycart")]
        public async Task<IActionResult> AddQuantitycart(int UserId, int ProductId)
        {
            Cart cart = await cartService.GetCartByUserIdAsync(UserId);
            CartDetail cart1 = await cartDetailsService.GetCartDetailByCartIdAndProductIdAsync(cart.Id, ProductId);

            if (cart1 != null)
            {
                Products products = await productService.GetProductByIdAsync(ProductId);
                if (cart1 != null)
                {

                    cart1.Quantity += 1;
                    cart1.TotalPrice = cart1.Quantity * products.price;
                    await cartDetailsService.UpdateCartAsync(cart1);
                    products.quantity -= 1;
                    await productService.UpdateProductAsync(products);
                }
            }

            return Ok("User added successfully.");
        }
        [HttpGet("addccart")]
        public async Task<IActionResult> Addccart(int UserId, int ProductId, int quantity)
        {
            Cart cart = new Cart();
            Cart cart1 = await cartService.GetCartByUserIdAsync(UserId);
            cart.CreatedAt = DateTime.Now;
            cart.UserId = UserId;
            int cartId = cart1?.Id ?? await cartService.AddCart(cart);
            Products product = await productService.GetProductByIdAsync(ProductId);
            CartDetail cartDetail1 = await cartDetailsService.GetCartDetailByCartIdAndProductIdAsync(cartId, product.id);
            CartDetail cartDetail = new CartDetail();
            if (cartDetail1 == null)
            {
                cartDetail.ProductId = ProductId;
                cartDetail.Quantity = quantity;
                cartDetail.TotalPrice = product.price * cartDetail.Quantity;
                cartDetail.CartId = cartId;
                await cartDetailsService.AddcartDetail(cartDetail);
            }
            else
            {
                cartDetail1.ProductId = ProductId;
                cartDetail1.Quantity += quantity;
                cartDetail1.TotalPrice = product.price * cartDetail1.Quantity;
                cartDetail1.CartId = cartId;
                await cartDetailsService.UpdateCartAsync(cartDetail1);
            }

            return Ok("User added successfully.");
        }
    }
}
