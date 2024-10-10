using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;
using WebApi.Services;
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
                if (cart1 !=null)
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
