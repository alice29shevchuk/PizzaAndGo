import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Footer from './Footer';
import ModalReview from './ModalReview';
const OrderHistory = () => {
  const dispatch = useDispatch();
  const iduser = JSON.parse(sessionStorage.getItem('user')).uid;
  const [currentOrderData, setCurrentOrderData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        console.log(iduser);
        const response = await axios.get(`http://alisa000077-001-site1.htempurl.com/api/Order/GetOrdersHistory?idUser=${iduser}`);
        console.log('Order History:', response.data);
        setCurrentOrderData(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []); 
  return (
    <>
    <h1 className='currentOrders'>История заказов</h1>
    <div className="current-order-container">
    {loading ? (
         <div className="loader">
         <svg className="circular" viewBox="25 25 50 50">
           <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
         </svg>
       </div>
    ) : (
    <>
    {currentOrderData && currentOrderData.map((orderItem) => (
      <div key={orderItem.id} className="order-item">
        <h2>Заказ №{orderItem.numberOfOrder}</h2>
        <p><strong>Имя: </strong>{orderItem.name}</p>
        <p><strong>Email: </strong>{orderItem.email}</p>
        <p><strong>Номер телефона: </strong>+{orderItem.phoneNumber}</p>
        <p><strong>Дата и время заказа: </strong>{orderItem.orderData}</p>
        <p><strong>Город: </strong>{orderItem.city}</p>
        <p><strong>Магазин: </strong>{orderItem.department}</p>
        <p><strong>Комментарий к заказу: </strong>{orderItem.comment}</p>
        <p><strong>Выбранный способ оплаты: </strong>{orderItem.paymentMethod === 'cash' ? 'Наличными в магазине' : 'Картой на сайте'}</p>
        {orderItem.productsInOrders && orderItem.productsInOrders.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.title} ({product.count}x)</h3>
            {product.selectedIngredients.length > 0 && (
                <p className="product-detail">{product.selectedIngredients.map(ingredient => ingredient.title).join(', ')}</p>
            )}
            {product.excludedIngredients.length > 0 && (
                <p className="product-detail">{product.excludedIngredients.map(ingredient => ingredient.title).join(', ')}</p>
            )}
            {product.selectedSauce!="" && <p className="product-detail">Соус: {product.selectedSauce}</p>}
            <p className="product-price">Цена: {product.price} грн</p>
          </div>
        ))}
        <p><strong>Готовность: </strong>{orderItem.isDone===false ? 'Заказ в обработке':'Заказ готов'}</p>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <p><strong>Итоговая сумма к оплате: </strong>{orderItem.paymentMethod === 'cash' ? `${orderItem.totalPrice} грн `: `Оплачено картой ${orderItem.totalPrice} грн`}</p>
          <button className='button' onClick={openModal}>Оставить отзыв</button>
          {isModalOpen && <ModalReview onClose={closeModal} />}
        </div>
      </div>
    ))}
    </>
    )}
  </div>
  <Footer></Footer>
  </>
  );
};

export default OrderHistory;
