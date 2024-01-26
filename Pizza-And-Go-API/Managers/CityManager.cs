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

		public void DeleteCity(int idForDelete)
		{
			City cityForDelete = this.context.City.Where(x => x.ID.Equals(idForDelete)).First();
			if(cityForDelete != null)
			{
				this.context.City.Remove(cityForDelete);
				SaveChanges();
			}
		}
	}
}

