using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
namespace WebApi.Services
{
    public class CartService
    {
        private readonly ApplicationDbContext _context;

        public CartService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Cart>> GetCartsAsync()
        {
            return await _context.Carts
                .OrderByDescending(s => s.Id).ToListAsync();
        }

        public async Task<int> AddCart(Cart cart)
        {
            if (cart.TotalPrice == null)
            {
                cart.TotalPrice = 0;
            }
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
            return cart.Id;

        }
        public async Task<Cart> GetCartByIdAsync(int id)
        {
            Cart cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return null;
            }
            return cart;
        }
        public async Task<Cart> GetCartByUserIdAsync(int userId)
        {
            Cart cart = await _context.Carts
                                      .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                return null;
            }
            return cart;
        }

        public async Task UpdateCartAsync(Cart cart)
        {
            var carts = await _context.Carts.FindAsync(cart.Id);
            carts.TotalPrice = cart.TotalPrice;
            _context.Carts.Update(carts);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCart(int id)
        {
            var category = await _context.Carts.FindAsync(id);
            if (category == null)
            {
                throw new ArgumentException("User not found.");
            }

            _context.Carts.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}
