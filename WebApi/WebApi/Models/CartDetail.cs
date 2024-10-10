using Microsoft.AspNetCore.Mvc;

namespace WebApi.Models
{
    public class CartDetail
    {
        public int Id { get; set; }
        public int? CartId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }

        public Cart? Cart { get; set; }
        public Products? Product { get; set; } // Assuming you have a Product class
    }
}
