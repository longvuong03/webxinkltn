using Microsoft.AspNetCore.Mvc;

namespace WebApi.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public decimal? TotalPrice { get; set; }
        public User User { get; set; }
        public ICollection<CartDetail> CartDetails { get; set; }

    }
}
