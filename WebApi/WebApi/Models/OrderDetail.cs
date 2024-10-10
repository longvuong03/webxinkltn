namespace WebApi.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }

        public Order? Order { get; set; }
        public Products? Product { get; set; } // Assuming you have a Product class
    }
}
