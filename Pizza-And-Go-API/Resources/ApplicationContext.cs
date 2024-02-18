using System;
using Microsoft.EntityFrameworkCore;
using Pizza_And_Go_API.Models;
using Pizza_And_Go_API.Models.Order;

namespace Pizza_And_Go_API.Resources
{
	public class ApplicationContext : DbContext
    {
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<IngredientsAddItem> IngredientsAddItems { get; set; }
        public DbSet<Ingredient> Ingredient { get; set; }
        public DbSet<IngredientsExcept> IngredientsExcept { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Beverages> Beverages { get; set; }
        public DbSet<Souces> Souces { get; set; }
        public DbSet<FeedBack> FeedBack { get; set; }
        //
        //  Order
        //
        public DbSet<SelectedIngredient> SelectedIngredient { get; set; }
        public DbSet<ProductsInOrders> ProductsInOrders { get; set; }
        public DbSet<ExcludedIngredients> ExcludedIngredients { get; set; }
        public DbSet<Orders> Orders { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=SQL8005.site4now.net;Initial Catalog=db_aa466e_alisa000077pizza;User Id=db_aa466e_alisa000077pizza_admin;Password=Alisa2908#");
            }
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasKey(c => c.Id);
            modelBuilder.Entity<Pizza>().HasKey(c => c.id);
            modelBuilder.Entity<IngredientsAddItem>().HasKey(c => c.id);
            modelBuilder.Entity<IngredientsExcept>().HasKey(c => c.id);
            modelBuilder.Entity<Ingredient>().HasKey(c => c.Id);
            modelBuilder.Entity<City>().HasKey(c => c.ID);
            modelBuilder.Entity<Department>().HasKey(c => c.ID);
            modelBuilder.Entity<SelectedIngredient>().HasKey(c => c.Id);
            modelBuilder.Entity<ProductsInOrders>().HasKey(c => c.Id);
            modelBuilder.Entity<ExcludedIngredients>().HasKey(c => c.Id);
            modelBuilder.Entity<Orders>().HasKey(c => c.id);
            modelBuilder.Entity<FeedBack>().HasKey(c => c.ID);

            base.OnModelCreating(modelBuilder);
        }
    }
}