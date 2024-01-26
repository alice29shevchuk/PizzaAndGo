using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
	[ApiController]
    [Route("api/Ingredient")]
    public class AdminIngredientController
	{
        private IngredientManager manager;

        public AdminIngredientController()
		{
            this.manager = new IngredientManager();
        }

        [HttpPost]
        [Route("AddIngredient")]
        public void AddIngredient(Ingredient ingredientForAdd)
        {
            this.manager.AddIngredient(ingredientForAdd);
        }

        [HttpDelete]
        [Route("DeleteIngredient")]
        public void DeleteIngredient(int idForDelete)
        {
            this.manager.DeleteIngredient(idForDelete);
        }

        [HttpPost]
        [Route("UpdateIngredient")]
        public void UpdateIngredient(Ingredient ingredientForUpdate)
        {
            this.manager.UpdateIngredient(ingredientForUpdate);
        }

    }
}

