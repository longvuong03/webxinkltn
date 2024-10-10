using WebApi.Data;
using WebApi.Models;
using Microsoft.EntityFrameworkCore;
using WebApi.Models.DTO;

namespace WebApi.Services
{
    public class ProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Products>> GetProductsAsync()
        {
            return await _context.Product
                .OrderByDescending(p => p.id)
                .Select(p => new Products
                {
                    id = p.id,
                    nameProduct = p.nameProduct,
                    description = p.description,
                    quantity = p.quantity,
                    price = p.price,
                    img = p.img,
                    createdAt = p.createdAt
                })
                .ToListAsync();
        }


        public async Task AddProductAsync(Products product)
        {
            _context.Product.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<Products> GetProductByIdAsync(int? id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return null;
            }
            return product;
        }

        public async Task<Products> GetProductByNameAsync(string nameProduct)
        {
            return await _context.Product
                                 .FirstOrDefaultAsync(p => p.nameProduct == nameProduct);
        }

        public async Task UpdateProductAsync(Products product)
        {
            // Tìm sản phẩm cần cập nhật trong cơ sở dữ liệu
            var existingProduct = await _context.Product.FindAsync(product.id);
            if (existingProduct == null)
            {
                throw new Exception("Product not found.");
            }

            // Cập nhật các thuộc tính của sản phẩm
            existingProduct.nameProduct = product.nameProduct;
            existingProduct.description = product.description;
            existingProduct.price = product.price;
            existingProduct.quantity = product.quantity;
            existingProduct.img = product.img;

            // Lưu thay đổi vào cơ sở dữ liệu
            _context.Product.Update(existingProduct);
            await _context.SaveChangesAsync();
        }
        public async Task<ProductDTO> GetProductDTOByIdAsync(int id)
        {
            Products product = await _context.Product.FindAsync(id);

            // Check if the product exists
            if (product == null)
            {
                return null;
            }

            // Map the product entity to ProductDto
            var productDto = new ProductDTO
            {
                id = product.id,
                nameProduct = product.nameProduct,
                description = product.description,
                quantity = product.quantity,
                price = product.price,
                img = product.img,
                createdAt = product.createdAt
            };

            return productDto;
        }
        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                throw new ArgumentException("Product not found.");
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}
