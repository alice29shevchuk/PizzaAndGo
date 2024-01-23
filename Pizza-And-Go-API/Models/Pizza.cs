using System;
namespace Pizza_And_Go_API.Models
{
	public class Pizza
	{
        public int id { get; set; }
        public string imageUrl { get; set; }
        public string title { get; set; }
        //public List<int> types { get; set; }
        //public List<int> sizes { get; set; }
        public int price { get; set; }
        public int category { get; set; }
        public int rating { get; set; }
        public int weight { get; set; }
        public List<Ingredient> ingredients { get; set; }
        public string sauce { get; set; }
        public List<IngredientsAddItem> ingredientsAdd { get; set; }
        public List<IngredientsExcept> ingredientsExcepts { get; set; }

        public Pizza()
		{
		}
	}
}

