using WebApi.Data;
using WebApi.Models.DTO;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Services
{
    public class OrderDetailsService
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailsService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            return await _context.OrderDetails
                                 .Where(od => od.OrderId == orderId)
                                 .ToListAsync();
        }
        public async Task<List<OrderDetailDTO>> GetOrderDetailsAsync()
        {
            return await _context.OrderDetails
                .OrderByDescending(s => s.Id)
                .Select(od => new OrderDetailDTO
                {
                    Id = od.Id,
                    OrderId = od.OrderId,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity,
                    TotalPrice = od.TotalPrice
                }).ToListAsync();
        }

        public async Task<List<OrderDetailDTO>> GetListOrderDetailsAsync(int orderId)
        {
            return await _context.OrderDetails
                .Where(s => s.OrderId == orderId)
                .OrderByDescending(s => s.Id)
                .Select(od => new OrderDetailDTO
                {
                    Id = od.Id,
                    OrderId = od.OrderId,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity,
                    TotalPrice = od.TotalPrice
                }).ToListAsync();
        }

        public async Task AddOrderDetail(OrderDetailDTO orderDetailDto)
        {
            var orderDetail = new OrderDetail
            {
                OrderId = orderDetailDto.OrderId,
                ProductId = orderDetailDto.ProductId,
                Quantity = orderDetailDto.Quantity,
                TotalPrice = orderDetailDto.TotalPrice
            };

            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();
        }

        public async Task<OrderDetailDTO> GetOrderDetailByIdAsync(int id)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail == null)
            {
                return null;
            }

            return new OrderDetailDTO
            {
                Id = orderDetail.Id,
                OrderId = orderDetail.OrderId,
                ProductId = orderDetail.ProductId,
                Quantity = orderDetail.Quantity,
                TotalPrice = orderDetail.TotalPrice
            };
        }

        public async Task<OrderDetailDTO> GetOrderDetailByOrderIdAndProductIdAsync(int orderId, int productId)
        {
            var orderDetail = await _context.OrderDetails
                                            .FirstOrDefaultAsync(o => o.OrderId == orderId && o.ProductId == productId);

            if (orderDetail == null)
            {
                return null;
            }

            return new OrderDetailDTO
            {
                Id = orderDetail.Id,
                OrderId = orderDetail.OrderId,
                ProductId = orderDetail.ProductId,
                Quantity = orderDetail.Quantity,
                TotalPrice = orderDetail.TotalPrice
            };
        }

        public async Task UpdateOrderDetailAsync(OrderDetailDTO orderDetailDto)
        {
            var existingOrderDetail = await _context.OrderDetails.FindAsync(orderDetailDto.Id);
            if (existingOrderDetail != null)
            {
                existingOrderDetail.OrderId = orderDetailDto.OrderId;
                existingOrderDetail.ProductId = orderDetailDto.ProductId;
                existingOrderDetail.Quantity = orderDetailDto.Quantity;
                existingOrderDetail.TotalPrice = orderDetailDto.TotalPrice;

                _context.OrderDetails.Update(existingOrderDetail);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteOrderDetailAsync(int id)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail == null)
            {
                throw new ArgumentException("Order detail not found.");
            }

            _context.OrderDetails.Remove(orderDetail);
            await _context.SaveChangesAsync();
        }
    }
}
