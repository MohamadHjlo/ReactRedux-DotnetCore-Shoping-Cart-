using Microsoft.EntityFrameworkCore;
using SpaReduxDotNet.Models;

namespace SpaReduxDotNet.Data
{
    public class SpaReduxDotNetContext : DbContext
    {
        public SpaReduxDotNetContext(DbContextOptions<SpaReduxDotNetContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Todo> Todos { get; set; }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<ProductToCart> ProductToCarts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
       
            base.OnModelCreating(modelBuilder);
        }
    }
}
