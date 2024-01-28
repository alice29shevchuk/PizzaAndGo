using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models.Order;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
	[ApiController]
	[Route("api/Order")]
	public class AdminOrderController
	{
		private OrdersManager manager;
		public AdminOrderController()
		{
			this.manager = new OrdersManager();
		}

		[HttpGet]
		[Route("GetOrders")]
		public List<Orders> GetOrders()
		{
			return this.manager.GetOrders();
		}

		[HttpDelete]
		[Route("DeleteOrder")]
		public void DeleteOrder(int idForDelete)
		{
			this.manager.DeleteOrder(idForDelete);
		}

		[HttpPost]
		[Route("UpdateOrder")]
		public void UpdateOrder(Orders ordersForUpdate)
		{
			this.manager.UpdateOreder(ordersForUpdate);
		}
	}
}

