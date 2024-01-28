using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models.Order;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/Order")]
	public class OrderController
	{
		private OrdersManager manager;
		public OrderController()
		{
			this.manager = new OrdersManager();
		}

		[HttpGet]
		[Route("GetOrdersByID")]
		public List<Orders> GetOrdersByID(string idUser)
		{
			return this.manager.GetOrdersByID(idUser);
		}

		[HttpPost]
		[Route("AddOrder")]
		public void AddOrder(Orders ordersForAdd)
		{
			this.manager.AddOrder(ordersForAdd);
		}
	}
}

