using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/IngredientsAddItem")]
	public class IngredientsAddItemController
	{
		private IngredientsAddItemManager manager;

        public IngredientsAddItemController()
		{
			this.manager = new IngredientsAddItemManager();
		}

		[HttpGet]
		[Route("GetIngredientsAddItems")]
		public List<IngredientsAddItem> GetIngredientsAddItems()
		{
			return this.manager.GetIngredientsAddItems();
		}
	}
}

