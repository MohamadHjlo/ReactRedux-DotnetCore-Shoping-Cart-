using Microsoft.EntityFrameworkCore;
using SpaReactDotNet.Models;

namespace SpaReactDotNet.Data
{
    public class SpaReactDotNetContext : DbContext
    {
        public SpaReactDotNetContext(DbContextOptions<SpaReactDotNetContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
       
            base.OnModelCreating(modelBuilder);
        }
    }
}
