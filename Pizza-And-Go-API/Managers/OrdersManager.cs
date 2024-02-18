using System;
using System.Net.NetworkInformation;
using Pizza_And_Go_API.Models.Order;

namespace Pizza_And_Go_API.Managers
{
    public class OrdersManager : Manager
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

        public List<Orders> GetOrdersNow(string userID)
        {
            List<Orders> orders = this.context.Orders.Where(x => x.idUser.Equals(userID)).ToList();
            List<Orders> nowOrders = orders.Where(x => x.isDone.Equals(false)).ToList();
            foreach (var item in nowOrders)
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
            return nowOrders.OrderBy(x => x.orderData).ToList();
        }

        public List<Orders> GetOrdersHistory(string userID)
        {
            List<Orders> orders = this.context.Orders.Where(x => x.idUser.Equals(userID)).ToList();
            List<Orders> historyOrders = orders.Where(x => x.isDone.Equals(true)).ToList();
            foreach (var item in historyOrders)
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
            return historyOrders.OrderBy(x => x.orderData).ToList();
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
            Orders ordersForDelete = this.context.Orders.Where(x => x.id.Equals(idForDelete)).FirstOrDefault();

            List<ProductsInOrders> productsInOrders = this.context.ProductsInOrders.Where(x => x.Ordersid.Equals(ordersForDelete.id)).ToList();
            List<SelectedIngredient> selectedIngredients = new List<SelectedIngredient>();
            List<ExcludedIngredients> excludedIngredients = new List<ExcludedIngredients>();
            foreach (var product in productsInOrders)
            {
                selectedIngredients.AddRange(this.context.SelectedIngredient.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList());
                excludedIngredients.AddRange(this.context.ExcludedIngredients.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList());
            }

            this.context.ExcludedIngredients.RemoveRange(excludedIngredients);
            this.context.SelectedIngredient.RemoveRange(selectedIngredients);

            this.context.ProductsInOrders.RemoveRange(productsInOrders);

            this.context.Orders.Remove(ordersForDelete);

            SaveChanges();
        }

        public void UpdateOreder(Orders ordersForUpdate)
        {
            Orders order = this.context.Orders.Where(x => x.id.Equals(ordersForUpdate.id)).FirstOrDefault();

            List<ProductsInOrders> selfProductsList = this.context.ProductsInOrders.Where(x => x.Ordersid.Equals(order.id)).ToList();
            if (order != null)
            {
                order.id = ordersForUpdate.id;
                order.idUser = ordersForUpdate.idUser;
                order.isDone = ordersForUpdate.isDone;
                order.name = ordersForUpdate.name;
                order.numberOfOrder = ordersForUpdate.numberOfOrder;
                order.orderData = ordersForUpdate.orderData;
                order.paymentMethod = ordersForUpdate.paymentMethod;
                order.phoneNumber = ordersForUpdate.phoneNumber;
                order.email = ordersForUpdate.email;
                order.department = ordersForUpdate.department;
                order.comment = ordersForUpdate.comment;
                order.city = ordersForUpdate.city;

                //
                // update old product
                //

                foreach (var product in selfProductsList)
                {
                    //
                    //  delete product
                    //
                    if (ordersForUpdate.productsInOrders.Where(x => x.Id.Equals(product.Id)).FirstOrDefault() == null)
                    {
                        this.context.SelectedIngredient.RemoveRange(this.context.SelectedIngredient.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList());
                        this.context.ExcludedIngredients.RemoveRange(this.context.ExcludedIngredients.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList());
                        this.context.ProductsInOrders.Remove(product);
                    }
                }
                SaveChanges();

                foreach (var product in ordersForUpdate.productsInOrders)
                {
                    //
                    //  add new product
                    //
                    if (selfProductsList.Where(x => x.Id.Equals(product.Id)).FirstOrDefault() == null)
                    {
                        this.context.ProductsInOrders.Add(new ProductsInOrders
                        {
                            Id = product.Id,
                            Count = product.Count,
                            excludedIngredients = product.excludedIngredients,
                            Ordersid = product.Ordersid,
                            Price = product.Price,
                            selectedIngredients = product.selectedIngredients,
                            SelectedSauce = product.SelectedSauce,
                            Title = product.Title
                        });
                    }
                }
                selfProductsList = this.context.ProductsInOrders.Where(x => x.Ordersid.Equals(order.id)).ToList();
                SaveChanges();

                foreach (var product in selfProductsList)
                {
                    List<SelectedIngredient> SelfSelectedIngredients = this.context.SelectedIngredient.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList();
                    List<ExcludedIngredients> selfExcludedIngredients = this.context.ExcludedIngredients.Where(x => x.ProductsInOrdersId.Equals(product.Id)).ToList();
                    ProductsInOrders updateProduct = ordersForUpdate.productsInOrders.Where(x => x.Id.Equals(product.Id)).FirstOrDefault();
                    if (updateProduct != null)
                    {
                        if (SelfSelectedIngredients.Count > updateProduct.selectedIngredients.Count)
                        {
                            //
                            //  delete selected ing
                            //
                            foreach (var selIng in SelfSelectedIngredients)
                            {
                                if (updateProduct.selectedIngredients.Where(x => x.Id.Equals(selIng.Id)).FirstOrDefault() == null)
                                {
                                    this.context.SelectedIngredient.Remove(selIng);
                                }
                            }
                        }
                        else
                        {
                            product.selectedIngredients = updateProduct.selectedIngredients;
                        }

                        if (selfExcludedIngredients.Count > updateProduct.excludedIngredients.Count)
                        {
                            //
                            // delete excludedIngredients
                            //
                            foreach (var selIng in selfExcludedIngredients)
                            {
                                if (updateProduct.excludedIngredients.Where(x => x.Id.Equals(selIng.Id)).FirstOrDefault() == null)
                                {
                                    this.context.ExcludedIngredients.Remove(selIng);
                                }
                            }
                        }
                        else
                        {
                            product.excludedIngredients = updateProduct.excludedIngredients;
                        }
                        product.SelectedSauce = updateProduct.SelectedSauce;
                        product.Count = updateProduct.Count;
                    }
                }
                SaveChanges();

                //
                //  set total price
                //
                order = this.context.Orders.Where(x => x.id.Equals(ordersForUpdate.id)).FirstOrDefault();

                selfProductsList = this.context.ProductsInOrders.Where(x => x.Ordersid.Equals(order.id)).ToList();

                int tempTotalPrice = 0;

                foreach (var product in selfProductsList)
                {
                    tempTotalPrice += ((int)product.Price * product.Count);
                    foreach(var selIng in product.selectedIngredients)
                    {
                        var ingAddlist = this.context.IngredientsAddItems.Where(x => x.name.Equals(selIng.Title)).ToList();
                        var pizzaId = this.context.Pizzas.Where(x => x.title.Equals(product.Title)).FirstOrDefault();
                        if(pizzaId != null)
                        {
                            var ingAdd = ingAddlist.Where(x => x.PizzaId.Equals(pizzaId.id)).FirstOrDefault();
                            if (ingAdd != null)
                            {
                                tempTotalPrice += (ingAdd.price * product.Count);
                            }
                        }
                    }
                }
                order.totalPrice = tempTotalPrice;
                SaveChanges();
            }
        }

        public bool CheckTimeForOrder(string dateTime)
        {
            List<Orders> ordersForCheck = this.context.Orders.ToList();
            int countExOrder = 0;

            if(ordersForCheck != null)
            {
                foreach(var order in ordersForCheck)
                {
                    if (order.isDone.Equals(false))
                    {
                        if (order.orderData.Equals(dateTime))
                        {
                            countExOrder++;
                        }
                    }
                }
            }
            if(countExOrder >= 3)
            {
                return false;
            }
            return true;
        }
    }
}