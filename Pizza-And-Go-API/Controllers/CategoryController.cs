using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
    [ApiController]
    [Route("api/Category")]
    public class CategoryController
	{
		private CategoryManager manager;

		public CategoryController()
		{
			this.manager = new CategoryManager();
		}

		[HttpGet]
		[Route("GetCategoryes")]
		public List<Category> GetCategories()
		{
			return this.manager.GetCategory();
		}
	}
}

