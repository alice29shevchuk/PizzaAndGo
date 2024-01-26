using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/City")]
	public class CityController
	{
		private CityManager manager;

		public CityController()
		{
			manager = new CityManager();
		}

		[HttpGet]
		[Route("GetCityes")]
		public List<City> GetCities ()
		{
			return this.manager.GetCityes();
		}
	}
}

