namespace WebApi.Models.DTO
{
    public class ProductDTO
    {
        public int? id { get; set; }
        public string? img { get; set; }
        public string? nameProduct { get; set; }
        public string? description { get; set; }
        public int? quantity { get; set; }
        public int? price { get; set; }
        public DateTime? createdAt { get; set; }
    }
}
