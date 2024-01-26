using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
	[ApiController]
	[Route("api/Department")]
	public class DepartmentController
	{
		private DepartmentManager manager;

        public DepartmentController()
		{
			this.manager = new DepartmentManager();
		}

		[HttpGet]
		[Route("GetDepartmentByID")]
		public List<Department> GetDepartmentByID(int id)
		{
			return this.manager.GetDepartments(id);
		}
    }
}

