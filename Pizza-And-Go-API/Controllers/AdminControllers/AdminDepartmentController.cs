using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers.AdminControllers
{
    [ApiController]
    [Route("api/Department")]
    public class AdminDepartmentController
	{
        private DepartmentManager manager;

        public AdminDepartmentController()
		{
            this.manager = new DepartmentManager();
        }

        [HttpGet]
        [Route("GetAllDepartments")]
        public List<Department> GetAllDepartments()
        {
            return this.manager.GetDepartments();
        }

        [HttpPost]
        [Route("AddDepartment")]
        public void AddDepartment(Department departmentForAdd)
        {
            this.manager.AddDepartment(departmentForAdd);
        }

        [HttpDelete]
        [Route("DeleteDepartment")]
        public void DeleteDepartment(int idForDelete)
        {
            this.manager.DeleteDepartment(idForDelete);
        }

        [HttpPost]
        [Route("UpdateDepartment")]
        public void UpdateDepartment(Department departmentForUpdate)
        {
            this.manager.UpdateDepartment(departmentForUpdate);
        }

    }
}

