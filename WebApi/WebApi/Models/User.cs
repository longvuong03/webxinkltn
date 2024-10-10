using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }
        public string? email { get; set; }
        public string? first_name { get; set; }
        public string? last_name { get; set; }
        public string? password { get; set; }
        public string? address { get; set; }
        public string? avatar { get; set; }
        public ICollection<Cart>? Carts { get; set; }
        public ICollection<Order>? Orders { get; set; }

    }
}
