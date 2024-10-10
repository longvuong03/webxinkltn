namespace WebApi.Models.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? UserId { get; set; }
        public decimal? TotalAmount { get; set; }
        // Thêm các thuộc tính khác nếu cần thiết
    }
}
