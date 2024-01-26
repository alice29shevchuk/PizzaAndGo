using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/IngredientsExcept")]
	public class IngredientsExceptController
	{
		private IngredientsExceptManager manager;

        public IngredientsExceptController()
		{
			this.manager = new IngredientsExceptManager();
		}

		[HttpGet]
		[Route("GetIngredientsExcept")]
		public List<IngredientsExcept> GetIngredientsExcepts()
		{
			return this.manager.GetIngredientsExcepts();
		}
	}
}

