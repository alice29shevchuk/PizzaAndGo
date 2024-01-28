using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/Beverages")]
	public class BeveragesController
	{
		private BeveragesManager manager;

        public BeveragesController()
		{
			this.manager = new BeveragesManager();
		}

		[HttpGet]
		[Route("GetBeverages")]
		public List<Beverages> GetBeverages()
		{
			return this.manager.GetBeverages();
		}
	}
}

