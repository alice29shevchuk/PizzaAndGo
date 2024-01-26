using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class IngredientsAddItemManager:Manager
	{
		public IngredientsAddItemManager()
		{
		}

		//
		//	USER
		//
		public List<IngredientsAddItem> GetIngredientsAddItems()
		{
			return this.context.IngredientsAddItems.ToList();
        }

		//
		//	ADMIN
		//
		public void AddIngredientsAddItem(IngredientsAddItem ingredientsAddItem)
		{
			this.context.IngredientsAddItems.Add(ingredientsAddItem);
			SaveChanges();
		}

		public void UpdateIngredientsAddItem(IngredientsAddItem ingredientsAddItem)
		{
            IngredientsAddItem ingredientsAddItemForUpdate = this.context.IngredientsAddItems.Where(x => x.id.Equals(ingredientsAddItem.id)).First();
			if(ingredientsAddItemForUpdate != null)
			{
                ingredientsAddItemForUpdate.name = ingredientsAddItem.name;
                ingredientsAddItemForUpdate.PizzaId = ingredientsAddItem.PizzaId;
                ingredientsAddItemForUpdate.price = ingredientsAddItem.price;
                SaveChanges();
            }
        }

		public void DeleteIngredientsAddItem(int idForDelete)
		{
			IngredientsAddItem ingredientsAddItemForDelete = this.context.IngredientsAddItems.Where(x => x.id.Equals(idForDelete)).First();
			if(ingredientsAddItemForDelete != null)
			{
                this.context.IngredientsAddItems.Remove(ingredientsAddItemForDelete);
                SaveChanges();
            }
        }

    }
}

