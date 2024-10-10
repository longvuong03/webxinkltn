namespace WebApi.Models.DTO
{
    public class OrderDetailDTO
    {
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
        // Bạn có thể thêm các thuộc tính khác nếu cần
    }
}
