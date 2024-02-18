using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class CityManager:Manager
	{
		public CityManager()
		{
		}

		//
		//	USER
		//

		public List<City> GetCityes()
		{
			return this.context.City.ToList();
		}

		//
		//	ADMIN
		//

		public void AddCity(City cityForAdd)
		{
			this.context.City.Add(cityForAdd);
			SaveChanges();
		}

		public void UpdateCity(City cityForUpdate)
		{
			City city = this.context.City.Where(x => x.ID.Equals(cityForUpdate.ID)).First();
			if(city != null)
			{
				city.Name = cityForUpdate.Name;
				SaveChanges();
			}
		}

		public HttpResponseMessage DeleteCity(int idForDelete)
		{
			City cityForDelete = this.context.City.Where(x => x.ID.Equals(idForDelete)).First();
			List<Department> departments = this.context.Department.Where(x => x.IdCity.Equals(cityForDelete.ID)).ToList();
			if(cityForDelete != null)
			{
				if(departments.Count == 0)
				{
                    this.context.City.Remove(cityForDelete);
                    SaveChanges();
                    return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                }
            }
            return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
        }
	}
}

