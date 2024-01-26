using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
    [ApiController]
    [Route("api/IngredientsExcept")]
    public class AdminIngredientsExceptController
	{
        private IngredientsExceptManager manager;

        public AdminIngredientsExceptController()
		{
            this.manager = new IngredientsExceptManager();
        }

        [HttpPost]
        [Route("AddIngredientsExcept")]
        public void AddIngredientsExcept(IngredientsExcept ingredientsExceptForAdd)
        {
            this.manager.AddIngredientsExcept(ingredientsExceptForAdd);
        }

        [HttpDelete]
        [Route("DeleteIngredientsExcept")]
        public void DeleteIngredientsExcept(int idForDelete)
        {
            this.manager.DeleteIngredientsExcept(idForDelete);
        }

        [HttpPost]
        [Route("UpdateIngredientsExcept")]
        public void UpdateIngredientsExcept(IngredientsExcept ingredientsExceptForUpdate)
        {
            this.manager.UpdateIngredientsExcept(ingredientsExceptForUpdate);
        }
    }
}

