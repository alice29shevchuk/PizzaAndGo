using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
    [ApiController]
    [Route("api/Beverages")]
    public class AdminBeveragesController
	{
        private BeveragesManager manager;

        public AdminBeveragesController()
		{
            this.manager = new BeveragesManager();
        }

        [HttpPost]
        [Route("AddBeverage")]
        public void AddBeverage(Beverages beverageForAdd)
        {
            this.manager.AddBeverage(beverageForAdd);
        }

        [HttpDelete]
        [Route("DeleteBeverage")]
        public void DeleteBeverage(int idForDelete)
        {
            this.manager.DeleteBeverage(idForDelete);
        }

        [HttpPost]
        [Route("UpdateBeverage")]
        public void UpdateBeverage(Beverages beveragesForUpdate)
        {
            this.manager.UpdateBeverage(beveragesForUpdate);
        }

    }
}

