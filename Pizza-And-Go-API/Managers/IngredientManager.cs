using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class IngredientManager: Manager
	{
		public IngredientManager()
		{
		}

		//
		// USER
		//

		public List<Ingredient> GetIngredients()
		{
			return this.context.Ingredient.ToList();
        }

		//
		//	ADMIN
		//

		public void AddIngredient(Ingredient ingredientForAdd)
		{
			this.context.Ingredient.Add(ingredientForAdd);
			this.SaveChanges();
        }

		public void DeleteIngredient(int idForDelete)
		{
			Ingredient ingredientForDelete = this.context.Ingredient.Where(x => x.Id.Equals(idForDelete)).First();
			if(ingredientForDelete != null)
			{
                this.context.Ingredient.Remove(ingredientForDelete);
                this.SaveChanges();
            }
		}

		public void UpdateIngredient(Ingredient ingredientForUpdate)
		{
            Ingredient ingredient = this.context.Ingredient.Where(x => x.Id.Equals(ingredientForUpdate.Id)).First();
			if(ingredient != null)
			{
                ingredient.name = ingredientForUpdate.name;
                ingredient.PizzaId = ingredientForUpdate.PizzaId;
                this.SaveChanges();
            }
        }

    }
}

