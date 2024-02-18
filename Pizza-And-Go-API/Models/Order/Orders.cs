using System;
namespace Pizza_And_Go_API.Models.Order
{
	public class Orders
	{
		public int id { get; set; }
		public string numberOfOrder { get; set; }
		public string idUser { get; set; }
		public string name { get; set; }
		public string email { get; set; }
		public string phoneNumber { get; set; }
		public List<ProductsInOrders> productsInOrders { get; set; }
		public double totalPrice { get; set; }
		public string comment { get; set; }
		public string paymentMethod { get; set; }
		public string orderData { get; set; }
		public string city { get; set; }
		public string department { get; set; }
		public bool isDone { get; set; }
    }
}