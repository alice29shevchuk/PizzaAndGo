﻿using System;
namespace Pizza_And_Go_API.Models.Order
{
	public class SelectedIngredient
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public int ProductsInOrdersId { get; set; }

    }
}

