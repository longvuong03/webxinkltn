using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Services;
using StackExchange.Redis;
var builder = WebApplication.CreateBuilder(args);
// Đọc cấu hình Redis từ appsettings.json

// Thiết lập kết nối Redis
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<CartDetailsService>();
builder.Services.AddScoped<CartService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<OrderDetailsService>();
builder.Services.AddScoped<OrderService>();


builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("RedisConnection");
    options.InstanceName = "SampleInstance";
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("WebApi")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});

builder.Services.AddControllers();
builder.Services.AddSignalR();
var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.MapHub<ChatHub>("/chathub");

app.Run();
