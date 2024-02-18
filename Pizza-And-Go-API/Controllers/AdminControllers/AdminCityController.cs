using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
    [ApiController]
    [Route("api/City")]
    public class AdminCityController
	{
        private CityManager manager;

        public AdminCityController()
		{
            this.manager = new CityManager();
        }

        [HttpPost]
        [Route("AddCity")]
        public void AddCity(City newCity)
        {
            this.manager.AddCity(newCity);
        }

        [HttpDelete]
        [Route("DeleteCity")]
        public HttpResponseMessage DeleteCity(int idForDelete)
        {
           return this.manager.DeleteCity(idForDelete);
        }

        [HttpPost]
        [Route("UpdateCity")]
        public void UpdateCity(City cityForUpdate)
        {
            this.manager.UpdateCity(cityForUpdate);
        }
	}
}

