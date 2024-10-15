using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using WebApi.Models;
using WebApi.Models.DTO;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly CartDetailsService _cartDetailsService;
        private readonly CartService _cartService;
        private readonly OrderService _orderService;
        private readonly OrderDetailsService _orderDetailsService;
        private readonly ProductService _productService;
        private readonly UserService _userService; // Thêm UserService
        public OrderController(CartDetailsService cartDetailsService, CartService cartService, OrderService orderService, OrderDetailsService orderDetailsService, ProductService productService, UserService userService)
        {
            _cartDetailsService = cartDetailsService;
            _cartService = cartService;
            _orderService = orderService;
            _orderDetailsService = orderDetailsService;
            _productService = productService;
            _userService = userService; // Khởi tạo UserService
        }
        [HttpGet("AddOrder")]
        public async Task<IActionResult> AddOrder(int UserId)
        {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.UserId = UserId;
            orderDTO.OrderDate = DateTime.Now;
            orderDTO.TotalAmount = 0;
            int idorder = await _orderService.AddOrderAsync(orderDTO);
            Cart cart = await _cartService.GetCartByUserIdAsync(UserId);
            List<CartDetail> cartDetails = await _cartDetailsService.GetListCartDetailsAsync(cart.Id);

            foreach (var item in cartDetails)
            {
                item.Product = null;
                item.Cart = null;
                OrderDetailDTO detailDTO = new OrderDetailDTO();
                detailDTO.OrderId = idorder;
                detailDTO.ProductId = item.ProductId;
                detailDTO.Quantity = item.Quantity;
                detailDTO.TotalPrice = item.TotalPrice;
                await _orderDetailsService.AddOrderDetail(detailDTO);
                orderDTO.TotalAmount += item.TotalPrice.GetValueOrDefault();
            }
            await _orderService.UpdateOrderAsync(orderDTO);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            try
            {
                // Sử dụng CartService để xóa cart
                await _orderDetailsService.DeleteOrderDetailAsync(id); // Gọi phương thức xóa từ CartDetailsService
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
        public class PaymentRequest
        {
            public int OrderId { get; set; }
            public string Email { get; set; }
        }

        [HttpPost]
        [Route("payment")]
        public async Task<IActionResult> Payment([FromBody] PaymentRequest paymentRequest)
        {
            var order = await _orderService.GetOrderByIdAsync(paymentRequest.OrderId);

            if (order == null)
            {
                return BadRequest("Order not found");
            }

            if (string.IsNullOrEmpty(paymentRequest.Email))
            {
                return BadRequest("Email is required");
            }

            // Lấy danh sách OrderDetail từ OrderId
            var orderDetails = await _orderDetailsService.GetOrderDetailsByOrderIdAsync(paymentRequest.OrderId);
            if (orderDetails == null || !orderDetails.Any())
            {
                return BadRequest("No order details found for this order.");
            }

            // Tính tổng giá từ các OrderDetail
            decimal totalOrderPrice = orderDetails.Sum(od => od.TotalPrice.GetValueOrDefault());

            // Tạo bảng sản phẩm với số lượng và giá
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

            foreach (var detail in orderDetails)
            {
                var product = await _productService.GetProductByIdAsync(detail.ProductId);
                
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
                    <td><strong>{totalOrderPrice:C}</strong></td>
                </tr>
            </tfoot>
        </table>";

            // Tạo liên kết QR với tổng giá từ OrderDetail
            string qrCodeUrl = $"https://api.qrserver.com/v1/create-qr-code/?data=OrderID:{paymentRequest.OrderId},Total:{totalOrderPrice}&size=200x200";

            // Gửi email
            var mailMessage = new MailMessage("longkg4@gmail.com", paymentRequest.Email)
            {
                Subject = "Order Confirmation",
                Body = $@"
            <h1>Your Order Details</h1>
            <p>Order ID: {paymentRequest.OrderId}</p>
            <h3>Products:</h3>
            {productDetailsTable}
            <p><strong>Total Price: {totalOrderPrice:C}</strong></p>
            <p> Payment QR Code:</p>
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

            return Ok("Email sent successfully with product details.");
        }



        [HttpDelete("deleteOrder/{orderId}")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            // Gọi dịch vụ để xóa đơn hàng theo orderId
            var result = await _orderService.DeleteOrderAsync(orderId); // Sử dụng phương thức xóa trong service

            if (result)
            {
                return Ok("Order deleted successfully.");
            }
            return NotFound("Order not found.");
        }



        [HttpGet("listorder")]
        public async Task<IActionResult> ListOrder(int userId)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);

            // Nếu không có đơn hàng, trả về danh sách rỗng
            if (orders == null || !orders.Any())
            {
                return Ok(new List<OrderWithDetails>());
            }

            List<OrderWithDetails> orderWithDetailsList = new List<OrderWithDetails>();

            foreach (var order in orders)
            {
                var orderDetails = await _orderDetailsService.GetOrderDetailsByOrderIdAsync(order.Id);

                // Kiểm tra nếu không có chi tiết đơn hàng thì bỏ qua
                if (orderDetails == null || !orderDetails.Any())
                {
                    continue;
                }

                List<Modeldata> modeldatas = new List<Modeldata>();

                foreach (var item in orderDetails)
                {
                    Products product = await _productService.GetProductByIdAsync(item.ProductId);
                    product.OrderDetails = null;

                    var modeldata = new Modeldata()
                    {
                        OrderDetail = item,
                        Products = product
                    };
                    item.Product = null;
                    item.Order = null;
                    modeldatas.Add(modeldata);
                }

                var orderWithDetails = new OrderWithDetails()
                {
                    Order = order,
                    OrderDetails = modeldatas
                };
                orderWithDetailsList.Add(orderWithDetails);
            }

            return Ok(orderWithDetailsList);
        }


        // Định nghĩa lớp mới để chứa thông tin đơn hàng và danh sách sản phẩm
        public class OrderWithDetails
        {
            public Order Order { get; set; }
            public List<Modeldata> OrderDetails { get; set; }
        }

        // API để lấy tất cả đơn hàng
        [HttpGet("listallorders")]
        public async Task<IActionResult> ListAllOrders()
        {
            try
            {
                var orderDTOs = await _orderService.GetAllOrdersAsync(); // Lấy danh sách OrderDTO
                if (orderDTOs == null || !orderDTOs.Any())
                {
                    return Ok(new List<OrderWithDetails>());
                }

                List<OrderWithDetails> orderWithDetailsList = new List<OrderWithDetails>();

                foreach (var orderDTO in orderDTOs)
                {
                    // Ánh xạ OrderDTO sang Order
                    var order = new Order
                    {
                        Id = orderDTO.Id,
                        UserId = orderDTO.UserId,
                        CreatedAt = orderDTO.OrderDate,
                        TotalPrice = orderDTO.TotalAmount,
                        // Ánh xạ thêm các thuộc tính khác nếu cần
                    };

                    var orderDetails = await _orderDetailsService.GetOrderDetailsByOrderIdAsync(order.Id);
                    if (orderDetails == null || !orderDetails.Any())
                    {
                        continue; // Nếu không có chi tiết đơn hàng thì bỏ qua
                    }

                    List<Modeldata> modeldatas = new List<Modeldata>();

                    foreach (var item in orderDetails)
                    {
                        Products product = await _productService.GetProductByIdAsync(item.ProductId);
                        if (product != null) // Kiểm tra nếu product không null
                        {
                            product.OrderDetails = null;

                            var modeldata = new Modeldata()
                            {
                                OrderDetail = item,
                                Products = product
                            };
                            item.Product = null;
                            item.Order = null;
                            modeldatas.Add(modeldata);
                        }
                    }

                    var orderWithDetails = new OrderWithDetails()
                    {
                        Order = order,
                        OrderDetails = modeldatas
                    };
                    orderWithDetailsList.Add(orderWithDetails);
                }

                return Ok(orderWithDetailsList);
            }
            catch (Exception ex)
            {
                // Log exception và trả về lỗi
                return StatusCode(500, ex.Message); // Trả về mã trạng thái 500 Internal Server Error
            }
        }










    }
}
