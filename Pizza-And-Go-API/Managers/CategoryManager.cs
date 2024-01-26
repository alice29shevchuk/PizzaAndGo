using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class CategoryManager: Manager
	{
		private List<Category> categories;

		public CategoryManager()
		{
			UpdateData();
        }

		//
		//	User
		//
		public List<Category> GetCategory()
		{
			return this.categories;
		}


		//
		//	Admin
		//

		public void AddCategory(Category category)
		{
			this.context.Categories.Add(category);
			SaveChanges();
		}

		public void UpdateCategory(Category categoryForUpdate)
		{
			Category category = this.context.Categories.Where(x => x.Id.Equals(categoryForUpdate.Id)).First();
			category.Title = categoryForUpdate.Title;
            SaveChanges();
		}

		public void DeleteCategory(int idForDelete)
		{
			Category categoryForDelete = this.context.Categories.Where(x => x.Id.Equals(idForDelete)).First();
            this.context.Categories.Remove(categoryForDelete);
			SaveChanges();
		}

		//
		//	System
		//

		private void UpdateData()
		{
            this.categories = this.context.Categories.ToList();
        }
	}
}

