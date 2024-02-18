using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class DepartmentManager:Manager
	{
		public DepartmentManager()
		{
		}

		//
		//	USER
		//

		public List<Department> GetDepartments(int id)
		{
			return this.context.Department.Where(x => x.IdCity.Equals(id)).ToList();
		}


		//
		//	ADMIN
		//

		public List<Department> GetDepartments()
		{
			return this.context.Department.ToList();
		}

		public void AddDepartment(Department departmentForAdd)
		{
			this.context.Department.Add(departmentForAdd);
			SaveChanges();
		}

		public void UpdateDepartment(Department departmentForUpdate)
		{
			Department department = this.context.Department.Where(x => x.ID.Equals(departmentForUpdate.ID)).First();
			if(department != null)
			{
				department.Name = departmentForUpdate.Name;
				department.IdCity = departmentForUpdate.IdCity;
				SaveChanges();
			}
        }

		public void DeleteDepartment(int idForDelete)
		{
			Department departmentForDelete = this.context.Department.Where(x => x.ID.Equals(idForDelete)).First();
			if(departmentForDelete != null)
			{
				this.context.Department.Remove(departmentForDelete);
				SaveChanges();
			}
        }

    }
}

