using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class PizzaManager: Manager
	{
        //
        //  USER
        //

		public List<Pizza> GetPizzas()
		{
            List<Pizza> tempPizzas = this.context.Pizzas.ToList();
            foreach(var item in tempPizzas)
            {
                //
                //  Ingredient
                //
                List<Ingredient> tempIng = this.context.Ingredient.Where(x => x.PizzaId.Equals(item.id)).ToList();
                item.ingredients = tempIng;

                //
                // IngredientsAddItem
                //
                List<IngredientsAddItem> ingredientsAdds = this.context.IngredientsAddItems.Where(x => x.PizzaId.Equals(item.id)).ToList();
                item.ingredientsAdd = ingredientsAdds;

                //
                // IngredientsExcept
                //
                List<IngredientsExcept> ingredientsExcepts = this.context.IngredientsExcept.Where(x => x.PizzaId.Equals(item.id)).ToList();
                item.ingredientsExcepts = ingredientsExcepts;
            }
            return tempPizzas;
        }

        public List<Pizza> SearchPizzas(int? idCategory, string? sortBy, string? order, string? searchText)
        {
            List<Pizza> results = new List<Pizza>();

            if (searchText != null && searchText.Length > 0)
            {
                results = this.context.Pizzas.Where(x => x.title.ToLower().Contains(searchText.ToLower())).ToList();

            }
            if (idCategory != null)
            {
                results = this.context.Pizzas.Where(x => x.category.Equals(idCategory)).ToList();
            }

            if (sortBy != null)
            {
                if (order != null)
                {
                    if (order == "ask")
                    {
                        if (sortBy == "price")
                        {
                            results = results.OrderBy(x => x.price).ToList();
                        }

                        if (sortBy == "rating")
                        {
                            results = results.OrderBy(x => x.rating).ToList();
                        }

                        if (sortBy == "title")
                        {
                            results = results.OrderBy(x => x.title).ToList();
                        }
                    }
                    else if (order == "desk")
                    {
                        if (sortBy == "price")
                        {
                            results = results.OrderByDescending(x => x.price).ToList();
                        }

                        if (sortBy == "rating")
                        {
                            results = results.OrderByDescending(x => x.rating).ToList();
                        }

                        if (sortBy == "title")
                        {
                            results = results.OrderByDescending(x => x.title).ToList();
                        }
                    }
                }
            }
            return results;
        }

        //
        //  ADMIN
        //

        public void AddPizza(Pizza pizza)
        {
            this.context.Pizzas.Add(pizza);
            SaveChanges();
        }

        public void DeletePizza(int idPizza)
        {
            Pizza pizzaForDelete = this.context.Pizzas.Where(x => x.id.Equals(idPizza)).First();
            List<Ingredient> ingredientsForDelete = this.context.Ingredient.Where(x => x.PizzaId.Equals(idPizza)).ToList();
            List<IngredientsAddItem> ingredientsAddItemsForDelete = this.context.IngredientsAddItems.Where(x => x.PizzaId.Equals(idPizza)).ToList();
            List<IngredientsExcept> ingredientsExceptsForDelete = this.context.IngredientsExcept.Where(x => x.PizzaId.Equals(idPizza)).ToList();

            this.context.Ingredient.RemoveRange(ingredientsForDelete);
            this.context.IngredientsAddItems.RemoveRange(ingredientsAddItemsForDelete);
            this.context.IngredientsExcept.RemoveRange(ingredientsExceptsForDelete);

            this.context.Pizzas.Remove(pizzaForDelete);
            SaveChanges();
        }

        public void UpdatePizza(Pizza updatePizza)
        {
            this.context.Pizzas.Update(updatePizza);
            SaveChanges();
        }
	}
}

