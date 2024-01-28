using System;
namespace Pizza_And_Go_API.Models.Order
{
	public class ProductsInOrders
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public List<SelectedIngredient> selectedIngredients { get; set; }
		public List<ExcludedIngredients> excludedIngredients { get; set; }
		public string SelectedSauce { get; set; }
		public double Price { get; set; }
		public int Count { get; set; }
		public int Ordersid { get; set; }
    }
}

