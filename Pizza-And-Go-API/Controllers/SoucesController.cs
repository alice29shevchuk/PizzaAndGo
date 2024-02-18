using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/Souces")]
	public class SoucesController
	{
		private SoucesManager manager;

		public SoucesController()
		{
			this.manager = new SoucesManager();
		}

		[HttpGet]
		[Route("GetSouces")]
		public List<Souces> GetSouces()
		{
			return this.manager.GetSouces();
		}
    }
}

