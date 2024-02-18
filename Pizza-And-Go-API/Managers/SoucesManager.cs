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
            Souces souces = this.context.Souces.Where(x => x.Id.Equals(soucesForUpdate.Id)).FirstOrDefault();
            if (souces != null)
            {
                souces.title = soucesForUpdate.title;
                souces.Price = soucesForUpdate.Price;
                souces.imageUrl = soucesForUpdate.imageUrl;
                souces.Description = soucesForUpdate.Description;
                souces.weight = soucesForUpdate.weight;
                SaveChanges();
            }
        }

        public void DeleteSouce(int idForDelete)
        {
            Souces souces = this.context.Souces.Where(x => x.Id.Equals(idForDelete)).FirstOrDefault();
            if (souces != null)
            {
                this.context.Souces.Remove(souces);
                SaveChanges();
            }
        }
    }
}

