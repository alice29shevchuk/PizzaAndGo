using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class PizzaManager: Manager
	{
		public Pizza GetPizzas()
		{
            Pizza tempPizza = this.context.Pizzas.First();
            List<Ingredient> tempIng = this.context.Ingredient.Where(x => x.PizzaId.Equals(tempPizza.id)).ToList();
            Pizza backPizza = new Pizza { id = tempPizza.id, category = tempPizza.category, imageUrl = tempPizza.imageUrl, ingredients = tempIng, ingredientsAdd = tempPizza.ingredientsAdd, ingredientsExcepts = tempPizza.ingredientsExcepts, price = tempPizza.price, rating = tempPizza.rating, sauce = tempPizza.sauce, title = tempPizza.title, weight = tempPizza.weight };

            return backPizza;
        }
	}
}

