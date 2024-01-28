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

        public List<Pizza> GetPopularPizzas()
        {
            return this.context.Pizzas.Where(x => x.isPopular.Equals(true)).ToList();
        }

        public object SearchPizzas(int? idCategory, string? sortBy, string? order, string? searchText)
        {
            List<Pizza> pizzaResults = new List<Pizza>();
            List<Souces> soucesResults = new List<Souces>();
            List<Beverages> beveragesResults = new List<Beverages>();

            if (searchText != null && searchText.Length > 0)
            {
                pizzaResults = this.context.Pizzas.Where(x => x.title.ToLower().Contains(searchText.ToLower())).ToList();
                soucesResults = this.context.Souces.Where(x => x.Name.ToLower().Contains(searchText.ToLower())).ToList();
                beveragesResults = this.context.Beverages.Where(x => x.Name.ToLower().Contains(searchText.ToLower())).ToList();

            }
            if (idCategory != null)
            {
                pizzaResults = this.context.Pizzas.Where(x => x.category.Equals(idCategory)).ToList();
            }

            if (sortBy != null)
            {
                if (order != null)
                {
                    if (order == "ask")
                    {
                        if (sortBy == "price")
                        {
                            pizzaResults = pizzaResults.OrderBy(x => x.price).ToList();
                            soucesResults = soucesResults.OrderBy(x => x.Price).ToList();
                            beveragesResults = beveragesResults.OrderBy(x => x.Price).ToList();
                        }

                        if (sortBy == "rating")
                        {
                            pizzaResults = pizzaResults.OrderBy(x => x.rating).ToList();
                        }

                        if (sortBy == "title")
                        {
                            pizzaResults = pizzaResults.OrderBy(x => x.title).ToList();
                            soucesResults = soucesResults.OrderBy(x => x.Name).ToList();
                            beveragesResults = beveragesResults.OrderBy(x => x.Name).ToList();
                        }
                    }
                    else if (order == "desk")
                    {
                        if (sortBy == "price")
                        {
                            pizzaResults = pizzaResults.OrderByDescending(x => x.price).ToList();
                            soucesResults = soucesResults.OrderByDescending(x => x.Price).ToList();
                            beveragesResults = beveragesResults.OrderByDescending(x => x.Price).ToList();
                        }

                        if (sortBy == "rating")
                        {
                            pizzaResults = pizzaResults.OrderByDescending(x => x.rating).ToList();
                        }

                        if (sortBy == "title")
                        {
                            pizzaResults = pizzaResults.OrderByDescending(x => x.title).ToList();
                            soucesResults = soucesResults.OrderByDescending(x => x.Name).ToList();
                            beveragesResults = beveragesResults.OrderByDescending(x => x.Name).ToList();
                        }
                    }
                }
            }
            if(pizzaResults.Count > 0)
            {
                return pizzaResults;
            }
            if(soucesResults.Count > 0)
            {
                return soucesResults;
            }
            if(beveragesResults.Count > 0)
            {
                return beveragesResults;
            }
            return new List<object>();
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

