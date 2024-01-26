using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
    [ApiController]
    [Route("api/IngredientsAddItem")]
    public class AdminIngredientsAddItemController
	{
        private IngredientsAddItemManager manager;

        public AdminIngredientsAddItemController()
		{
            this.manager = new IngredientsAddItemManager();
        }

        [HttpPost]
        [Route("AddIngredientsAddItem")]
        public void AddIngredientsAddItem(IngredientsAddItem ingredientsAddItem)
        {
            this.manager.AddIngredientsAddItem(ingredientsAddItem);
        }

        [HttpDelete]
        [Route("DeleteIngredientsAddItem")]
        public void DeleteIngredientsAddItem(int idForDelete)
        {
            this.manager.DeleteIngredientsAddItem(idForDelete);
        }

        [HttpPost]
        [Route("UpdateIngredientsAddItem")]
        public void UpdateIngredientsAddItem(IngredientsAddItem ingredientsAddItemForUpdate)
        {
            this.manager.UpdateIngredientsAddItem(ingredientsAddItemForUpdate);
        }
    }
}

