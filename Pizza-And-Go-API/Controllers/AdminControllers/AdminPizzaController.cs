using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
    [ApiController]
    [Route("api/Pizza")]
    public class AdminPizzaController
	{
        private PizzaManager manager;
        public AdminPizzaController()
		{
            this.manager = new PizzaManager();
        }

        [HttpPost]
        [Route("AddPizza")]
        public void AddPizza(Pizza pizza)
        {
            this.manager.AddPizza(pizza);
        }


        [HttpDelete]
        [Route("DeletePizza")]
        public void DeletePizza(int idPizza)
        {
            this.manager.DeletePizza(idPizza);
        }

        [HttpPost]
        [Route("UpdatePizza")]
        public void UpdatePizza(Pizza pizzaForUpdate)
        {
            this.manager.UpdatePizza(pizzaForUpdate);
        }
    }
}

