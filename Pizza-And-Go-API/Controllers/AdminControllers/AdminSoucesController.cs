using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
    [ApiController]
    [Route("api/Souces")]
    public class AdminSoucesController
	{
        private SoucesManager manager;

        public AdminSoucesController()
		{
            this.manager = new SoucesManager();
        }

        [HttpPost]
        [Route("AddSouce")]
        public void AddSouce(Souces soucesForAdd)
        {
            this.manager.AddSouce(soucesForAdd);
        }

        [HttpDelete]
        [Route("DeleteSouce")]
        public void DeleteSouce(int idForDelete)
        {
            this.manager.DeleteSouce(idForDelete);
        }

        [HttpPost]
        [Route("UpdateSouce")]
        public void UpdateSouce(Souces soucesForUpdate)
        {
            this.manager.UpdateSouce(soucesForUpdate);
        }
    }
}

