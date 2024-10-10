using WebApi.Data;
using WebApi.Models;
using Microsoft.EntityFrameworkCore;
namespace WebApi.Services
{
    public class CartDetailsService
    {

        private readonly ApplicationDbContext _context;

        public CartDetailsService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<CartDetail>> GetCartDetailsAsync()
        {
            return await _context.CartDetails
                .OrderByDescending(s => s.Id).ToListAsync();
        }

        public async Task<List<CartDetail>> GetListCartDetailsAsync(int CartId)
        {
            return await _context.CartDetails.Where(s => s.CartId == CartId)
                .OrderByDescending(s => s.Id).ToListAsync();
        }

        public async Task AddcartDetail(CartDetail cartDetail)
        {
            _context.CartDetails.Add(cartDetail);
            await _context.SaveChangesAsync();

        }
        public async Task<CartDetail> GetcartDetailByIdAsync(int id)
        {
            CartDetail cart = await _context.CartDetails.FindAsync(id);
            if (cart == null)
            {
                return null;
            }
            return cart;
        }
        public async Task<CartDetail> GetCartDetailByCartIdAndProductIdAsync(int cartId, int productId)
        {
            return await _context.CartDetails
                                 .FirstOrDefaultAsync(c => c.CartId == cartId && c.ProductId == productId);
        }

        public async Task UpdateCartAsync(CartDetail cart)
        {
            var carts = await _context.CartDetails.FindAsync(cart.Id);
            _context.CartDetails.Update(carts);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCart(int id)
        {
            var category = await _context.CartDetails.FindAsync(id);
            if (category == null)
            {
                throw new ArgumentException("User not found.");
            }

            _context.CartDetails.Remove(category);
            await _context.SaveChangesAsync();
        }
    }

}
