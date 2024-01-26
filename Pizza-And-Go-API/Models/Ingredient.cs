using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pizza_And_Go_API.Models
{
	public class Ingredient
	{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        public string name { get; set; }
        public int PizzaId { get; set; }
	}
}

