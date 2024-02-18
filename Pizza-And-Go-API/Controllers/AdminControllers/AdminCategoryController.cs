using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
    [ApiController]
    [Route("api/Category")]
    public class AdminCategoryController
	{
        private CategoryManager manager;

        public AdminCategoryController()
		{
            this.manager = new CategoryManager();
        }

        [HttpPost]
        [Route("AddCategory")]
        public void AddCategory(Category category)
        {
            this.manager.AddCategory(category);
        }

        [HttpDelete]
        [Route("DeleteCategory")]
        public HttpResponseMessage DeleteCategory(int idForDelete)
        {
            return this.manager.DeleteCategory(idForDelete);
        }

        [HttpPost]
        [Route("UpdateCategory")]
        public void UpdateCategory(Category categoryForUpdate)
        {
            this.manager.UpdateCategory(categoryForUpdate);
        }
	}
}

