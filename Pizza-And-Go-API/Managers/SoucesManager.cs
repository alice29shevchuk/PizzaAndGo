using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class SoucesManager:Manager
	{
        //
        //	USER
        //

        public List<Souces> GetSouces()
        {
            return this.context.Souces.ToList();
        }

        //
        //	ADMIN
        //

        public void AddSouce(Souces soucesForAdd)
        {
            this.context.Souces.Add(soucesForAdd);
            SaveChanges();
        }

        public void UpdateSouce(Souces soucesForUpdate)
        {
            Souces souces = this.context.Souces.Where(x => x.Id.Equals(soucesForUpdate.Id)).First();
            if (souces != null)
            {
                souces.Name = soucesForUpdate.Name;
                souces.Price = soucesForUpdate.Price;
                souces.URL = soucesForUpdate.URL;
                souces.Description = soucesForUpdate.Description;
                SaveChanges();
            }
        }

        public void DeleteSouce(int idForDelete)
        {
            Souces souces = this.context.Souces.Where(x => x.Id.Equals(idForDelete)).First();
            if (souces != null)
            {
                this.context.Souces.Remove(souces);
                SaveChanges();
            }
        }
    }
}

