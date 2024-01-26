using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/Ingredient")]
	public class IngredientController
	{
		private IngredientManager manager;

        public IngredientController()
		{
			this.manager = new IngredientManager();
		}

		[HttpGet]
		[Route("GetIngredient")]
		public List<Ingredient> GetIngredients()
		{
			return this.manager.GetIngredients();
		}
	}
}

