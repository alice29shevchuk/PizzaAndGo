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

        public Pizza GetPizzasByID(int idPizza)
        {
            Pizza pizza =  this.context.Pizzas.Where(x => x.id.Equals(idPizza)).First();

            pizza.ingredients = this.context.Ingredient.Where(x => x.PizzaId.Equals(pizza.id)).ToList();
            pizza.ingredientsAdd = this.context.IngredientsAddItems.Where(x => x.PizzaId.Equals(pizza.id)).ToList();
            pizza.ingredientsExcepts = this.context.IngredientsExcept.Where(x => x.PizzaId.Equals(pizza.id)).ToList();

            return pizza;
        }

        public List<Pizza> GetPopularPizzas()
        {
            return this.context.Pizzas.Where(x => x.isPopular.Equals(true)).ToList();
        }

        public object SearchPizzas(int? idCategory, string? sortBy, string? order, string? searchText)
        {
            List<Pizza> pizzas = this.context.Pizzas.ToList();

            List<Souces> soucesResults = new List<Souces>();
            List<Beverages> beveragesResults = new List<Beverages>();

            foreach(var item in pizzas)
            {
                item.ingredients = this.context.Ingredient.Where(x => x.PizzaId.Equals(item.id)).ToList();
                item.ingredientsAdd = this.context.IngredientsAddItems.Where(x => x.PizzaId.Equals(item.id)).ToList();
                item.ingredientsExcepts = this.context.IngredientsExcept.Where(x => x.PizzaId.Equals(item.id)).ToList();
            }

            List<Pizza> pizzaResults = pizzas;

            if (searchText != null && searchText.Length > 0)
            {
                pizzaResults = pizzaResults.Where(x => x.title.ToLower().Contains(searchText.ToLower())).ToList();
                soucesResults = this.context.Souces.Where(x => x.title.ToLower().Contains(searchText.ToLower())).ToList();
                beveragesResults = this.context.Beverages.Where(x => x.Name.ToLower().Contains(searchText.ToLower())).ToList();

            }

            if (idCategory != null)
            {
                if(idCategory == 0)
                {
                    pizzaResults = pizzas;
                }
                else
                {
                    pizzaResults = pizzaResults.Where(x => x.category.Equals(idCategory)).ToList();
                }
            }

            if (sortBy != null)
            {
                if (order != null)
                {
                    if (order == "asc")
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
                            soucesResults = soucesResults.OrderBy(x => x.title).ToList();
                            beveragesResults = beveragesResults.OrderBy(x => x.Name).ToList();
                        }
                    }
                    else if (order == "desc")
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
                            soucesResults = soucesResults.OrderByDescending(x => x.title).ToList();
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
            Pizza pizza = this.context.Pizzas.Where(x => x.id.Equals(updatePizza.id)).First();
            List<Ingredient> ingredientsOfPizza = this.context.Ingredient.Where(x => x.PizzaId.Equals(updatePizza.id)).ToList();

            List<IngredientsAddItem> ingredientsAddItems = this.context.IngredientsAddItems.Where(x => x.PizzaId.Equals(updatePizza.id)).ToList();

            List<IngredientsExcept> ingredientsExcepts = this.context.IngredientsExcept.Where(x => x.PizzaId.Equals(updatePizza.id)).ToList();

           

            if(ingredientsOfPizza.Count != updatePizza.ingredients.Count)
            {
                if (ingredientsOfPizza.Count > updatePizza.ingredients.Count)
                {
                    //delete
                    foreach (var ing in ingredientsOfPizza)
                    {
                        if (updatePizza.ingredients.Where(x => x.Id.Equals(ing.Id)).FirstOrDefault() == null)
                        {
                            this.context.Ingredient.Remove(this.context.Ingredient.Where(x => x.Id == ing.Id).First());
                        }
                    }
                    ingredientsOfPizza = updatePizza.ingredients;
                }

                if (ingredientsOfPizza.Count < updatePizza.ingredients.Count)
                {
                    //add
                    foreach (var ing in updatePizza.ingredients)
                    {
                        if (ingredientsOfPizza.Where(x => x.Id.Equals(ing.Id)).FirstOrDefault() == null)
                        {
                            this.context.Ingredient.Add(new Ingredient { Id = ing.Id, name = ing.name, PizzaId = ing.PizzaId });
                            SaveChanges();
                        }
                    }

                }
            }
            else
            {
                //update
                foreach(var ing in updatePizza.ingredients)
                {
                    Ingredient tempIng = ingredientsOfPizza.Where(x => x.Id.Equals(ing.Id)).FirstOrDefault();
                    if ( tempIng != null)
                    {
                        if(tempIng.name != ing.name)
                        {
                            tempIng.name = ing.name;
                        }
                    }
                }
            }

            if(ingredientsAddItems.Count != updatePizza.ingredientsAdd.Count)
            {
                if(ingredientsAddItems.Count < updatePizza.ingredientsAdd.Count)
                {
                    // add
                    foreach(var ingAdd in updatePizza.ingredientsAdd)
                    {
                        if(ingredientsAddItems.Where(x => x.id.Equals(ingAdd.id)).FirstOrDefault() == null)
                        {
                            this.context.IngredientsAddItems.Add(new IngredientsAddItem { id = ingAdd.id, name = ingAdd.name, price = ingAdd.price, PizzaId = ingAdd.PizzaId });
                            SaveChanges();
                        }
                    }
                }

                if (ingredientsAddItems.Count > updatePizza.ingredientsAdd.Count)
                {
                    // delete
                    foreach(var ingAdd in ingredientsAddItems)
                    {
                        if(updatePizza.ingredientsAdd.Where(x => x.id.Equals(ingAdd.id)).FirstOrDefault() == null)
                        {
                            this.context.IngredientsAddItems.Remove(this.context.IngredientsAddItems.Where(x => x.id.Equals(ingAdd.id)).First());
                        }
                    }
                    ingredientsAddItems = updatePizza.ingredientsAdd;
                }
            }
            else
            {
                //update
                foreach(var ingAdd in updatePizza.ingredientsAdd)
                {
                    IngredientsAddItem addItem = ingredientsAddItems.Where(x => x.id.Equals(ingAdd.id)).FirstOrDefault();
                    if(addItem != null)
                    {
                        if(addItem.name != ingAdd.name || addItem.price != ingAdd.price)
                        {
                            addItem.name = ingAdd.name;
                            addItem.price = ingAdd.price;
                        }
                    }
                }
            }

            if(ingredientsExcepts.Count != updatePizza.ingredientsExcepts.Count)
            {
                if(ingredientsExcepts.Count < updatePizza.ingredientsExcepts.Count)
                {
                    // add
                    foreach(var ingExcept in updatePizza.ingredientsExcepts)
                    {
                        if(ingredientsExcepts.Where(x => x.id.Equals(ingExcept.id)).FirstOrDefault() == null)
                        {
                            this.context.IngredientsExcept.Add(new IngredientsExcept { id = ingExcept.id, name = ingExcept.name, PizzaId = ingExcept.PizzaId });
                            SaveChanges();
                        }
                    }
                }

                if (ingredientsExcepts.Count > updatePizza.ingredientsExcepts.Count)
                {
                    // delete
                    foreach(var ingExcept in ingredientsExcepts)
                    {
                        if(updatePizza.ingredientsExcepts.Where(x => x.id.Equals(ingExcept.id)).FirstOrDefault() == null)
                        {
                            this.context.IngredientsExcept.Remove(this.context.IngredientsExcept.Where(x => x.id.Equals(ingExcept.id)).First());
                        }
                    }
                    ingredientsExcepts = updatePizza.ingredientsExcepts;
                }
            }
            else
            {
                // update
                foreach(var ingExcept in updatePizza.ingredientsExcepts)
                {
                    IngredientsExcept except = ingredientsExcepts.Where(x => x.id.Equals(ingExcept.id)).FirstOrDefault();
                    if(except != null)
                    {
                        if(except.name != ingExcept.name)
                        {
                            except.name = ingExcept.name;
                        }
                    }
                }
            }

            pizza.id = updatePizza.id;
            pizza.imageUrl = updatePizza.imageUrl;

            pizza.category = updatePizza.category;
            pizza.isPopular = updatePizza.isPopular;
            pizza.price = updatePizza.price;
            pizza.rating = updatePizza.rating;
            pizza.sauce = updatePizza.sauce;
            pizza.title = updatePizza.title;
            pizza.weight = updatePizza.weight;

            SaveChanges();
        }
	}
}

