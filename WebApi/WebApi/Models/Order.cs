namespace WebApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public decimal? TotalPrice { get; set; }
        public User User { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
