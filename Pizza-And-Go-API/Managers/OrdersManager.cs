using System;
using Pizza_And_Go_API.Models.Order;

namespace Pizza_And_Go_API.Managers
{
	public class OrdersManager: Manager
	{
		//
		//	USER
		//

		public List<Orders> GetOrdersByID(string idUser)
		{
            foreach (var item in this.context.Orders.ToList())
            {
                List<SelectedIngredient> selectedIngredients = this.context.SelectedIngredient.ToList();
                List<ExcludedIngredients> excludedIngredients = this.context.ExcludedIngredients.ToList();

                List<ProductsInOrders> productsInOrders = this.context.ProductsInOrders.ToList();

                foreach (var product in productsInOrders)
                {
                    product.selectedIngredients = selectedIngredients.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList();
                    product.excludedIngredients = excludedIngredients.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList();
                }

                item.productsInOrders = productsInOrders.Where(x => x.Ordersid.Equals(item.id)).ToList();
            }
            return this.context.Orders.Where(x => x.idUser.Equals(idUser)).ToList();
        }

		public void AddOrder(Orders ordersForAdd)
		{
			this.context.Orders.Add(ordersForAdd);
			SaveChanges();
		}

        //
        //  ADMIN
        //

        public List<Orders> GetOrders()
        {
            foreach (var item in this.context.Orders.ToList())
            {
                List<SelectedIngredient> selectedIngredients = this.context.SelectedIngredient.ToList();
                List<ExcludedIngredients> excludedIngredients = this.context.ExcludedIngredients.ToList();

                List<ProductsInOrders> productsInOrders = this.context.ProductsInOrders.ToList();

                foreach (var product in productsInOrders)
                {
                    product.selectedIngredients = selectedIngredients.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList();
                    product.excludedIngredients = excludedIngredients.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList();
                }

                item.productsInOrders = productsInOrders.Where(x => x.Ordersid.Equals(item.id)).ToList();
            }
            return this.context.Orders.ToList();
        }

        public void DeleteOrder(int idForDelete)
        {
            this.context.Orders.Remove(this.context.Orders.Where(x => x.id.Equals(idForDelete)).First());
            SaveChanges();
        }

        public void UpdateOreder(Orders ordersForUpdate)
        {
            this.context.Orders.Update(ordersForUpdate);
            SaveChanges();
        }
    }
}