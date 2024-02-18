using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class BeveragesManager: Manager
	{
		//
		//	USER
		//

		public List<Beverages> GetBeverages()
		{
			return this.context.Beverages.ToList();
		}

		//
		//	ADMIN
		//

		public void AddBeverage(Beverages beveragesForAdd)
		{
			this.context.Beverages.Add(beveragesForAdd);
			SaveChanges();
		}

		public void UpdateBeverage(Beverages beveragesForUpdate)
		{
			Beverages beverages = this.context.Beverages.Where(x => x.Id.Equals(beveragesForUpdate.Id)).FirstOrDefault();
			if(beverages != null)
			{
				beverages.Name = beveragesForUpdate.Name;
				beverages.Price = beveragesForUpdate.Price;
				beverages.URL = beveragesForUpdate.URL;
				beverages.Description = beveragesForUpdate.Description;
				SaveChanges();
			}
        }

		public void DeleteBeverage(int idForDelete)
		{
            Beverages beverages = this.context.Beverages.Where(x => x.Id.Equals(idForDelete)).FirstOrDefault();
			if(beverages != null)
			{
				this.context.Beverages.Remove(beverages);
				SaveChanges();
			}
        }
    }
}

