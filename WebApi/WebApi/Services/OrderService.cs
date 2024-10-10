using WebApi.Data;
using Microsoft.EntityFrameworkCore;
using WebApi.Models.DTO;
using WebApi.Models;

namespace WebApi.Services
{
    public class OrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<OrderDTO>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Select(order => new OrderDTO
                {
                    Id = order.Id,
                    OrderDate = order.CreatedAt,
                    UserId = order.UserId,
                    TotalAmount = order.TotalPrice
                })
                .ToListAsync();
        }
        public async Task<List<OrderDTO>> GetOrdersAsync()
        {
            return await _context.Orders
                .OrderByDescending(o => o.Id)
                .Select(order => new OrderDTO
                {
                    Id = order.Id,
                    OrderDate = order.CreatedAt,
                    UserId = order.UserId,
                    TotalAmount = order.TotalPrice
                }).ToListAsync();
        }

        public async Task<OrderDTO> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return null;
            }

            return new OrderDTO
            {
                Id = order.Id,
                OrderDate = order.CreatedAt,
                UserId = order.UserId,
                TotalAmount = order.TotalPrice
            };
        }
        public async Task<List<Order>> GetOrdersByUserIdAsync(int userId)
        {
            return await _context.Orders
                                 .Where(o => o.UserId == userId)
                                 .ToListAsync();
        }
        public async Task<int> AddOrderAsync(OrderDTO orderDto)
        {
            var order = new Order
            {
                CreatedAt = orderDto.OrderDate,
                UserId = orderDto.UserId,
                TotalPrice = orderDto.TotalAmount
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order.Id;
        }

        public async Task UpdateOrderAsync(OrderDTO orderDto)
        {
            var existingOrder = await _context.Orders.FindAsync(orderDto.Id);
            if (existingOrder != null)
            {
                existingOrder.CreatedAt = orderDto.OrderDate;
                existingOrder.UserId = orderDto.UserId;
                existingOrder.TotalPrice = orderDto.TotalAmount;

                _context.Orders.Update(existingOrder);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                throw new ArgumentException("Order not found.");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}
