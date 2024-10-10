using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Products> Product { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartDetail> CartDetails { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the relationships

            // User - Cart (One-to-Many)
            modelBuilder.Entity<User>()
    .HasMany(u => u.Carts)
    .WithOne(c => c.User)
    .HasForeignKey(c => c.UserId)
    .OnDelete(DeleteBehavior.Restrict); // When a User is deleted, restrict deletion if referenced by Carts

            modelBuilder.Entity<Products>()
                .HasMany(p => p.CartDetails)
                .WithOne(cd => cd.Product)
                .HasForeignKey(cd => cd.ProductId)
                .OnDelete(DeleteBehavior.Restrict); // When a Product is deleted, prevent deletion if it is referenced by any CartDetail

            modelBuilder.Entity<Cart>()
                .HasMany(c => c.CartDetails)
                .WithOne(cd => cd.Cart)
                .HasForeignKey(cd => cd.CartId)
                .OnDelete(DeleteBehavior.Restrict); // When a Cart is deleted, restrict deletion if referenced by CartDetails

            // User - Order (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict); // When a User is deleted, restrict deletion if referenced by Orders

            // Order - OrderDetail (One-to-Many)
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderDetails)
                .WithOne(od => od.Order)
                .HasForeignKey(od => od.OrderId)
                .OnDelete(DeleteBehavior.Restrict); // When an Order is deleted, restrict deletion if referenced by OrderDetails

            // Product - OrderDetail (One-to-Many)
            modelBuilder.Entity<Products>()
                .HasMany(p => p.OrderDetails)
                .WithOne(od => od.Product)
                .HasForeignKey(od => od.ProductId)
                .OnDelete(DeleteBehavior.Restrict); // When a Product is deleted, restrict deletion if referenced by OrderDetails


            base.OnModelCreating(modelBuilder);
        }
    }
}
