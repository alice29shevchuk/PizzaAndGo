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
		public List<Pizza> GetPizzas()
		{
			return this.manager.GetPizzas();
		}

		[HttpGet]
		[Route("GetPopularPizzas")]
		public List<Pizza> GetPopularPizzas()
		{
			return this.manager.GetPopularPizzas();
		}

        [HttpGet]
		[Route("Search")]
		public object Saerch(int? idCategory, string? sortBy, string? order, string? searchText)
		{
			return this.manager.SearchPizzas(idCategory, sortBy, order, searchText);
		}
	}
}

