using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;
using Pizza_And_Go_API.Resources;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/Pizza")]
	public class PizzaController
	{
		private PizzaManager manager;
		public PizzaController()
		{
			this.manager = new PizzaManager();
		}

		[HttpGet]
		[Route("GetPizzas")]
		public Pizza GetPizzas()
		{
			return this.manager.GetPizzas();
		}
	}
}

