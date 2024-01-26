using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class IngredientsExceptManager:Manager
	{
		public IngredientsExceptManager()
		{
		}

		//
		//	USER
		//
		public List<IngredientsExcept> GetIngredientsExcepts()
		{
			return this.context.IngredientsExcept.ToList();
		}

		//
		//	ADMIN
		//

		public void AddIngredientsExcept(IngredientsExcept ingredientsExceptForAdd)
		{
			this.context.IngredientsExcept.Add(ingredientsExceptForAdd);
			SaveChanges();
		}

		public void UpdateIngredientsExcept(IngredientsExcept ingredientsExceptForUpdate)
		{
            IngredientsExcept ingredientsExcept = this.context.IngredientsExcept.Where(x => x.id.Equals(ingredientsExceptForUpdate.id)).First();
			if(ingredientsExcept != null)
			{
				ingredientsExcept.name = ingredientsExceptForUpdate.name;
				ingredientsExcept.PizzaId = ingredientsExceptForUpdate.PizzaId;
				SaveChanges();
            }
        }

		public void DeleteIngredientsExcept(int idForDelete)
		{
            IngredientsExcept ingredientsExceptForDelete =  this.context.IngredientsExcept.Where(x => x.id.Equals(idForDelete)).First();
			if(ingredientsExceptForDelete != null)
			{
				this.context.IngredientsExcept.Remove(ingredientsExceptForDelete);
				SaveChanges();
			}
		}
    }
}

