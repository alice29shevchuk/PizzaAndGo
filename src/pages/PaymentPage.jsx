import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPhoneNumber, setOrder } from '../redux/slices/paymentSlice';
import { cartSelector } from '../redux/slices/cartSlice';

export const PaymentPage = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);
  const { totalPrice, items } = useSelector(cartSelector);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
    console.log(items);
  useEffect(() => {
    const order = {
      name,
      phoneNumber: '',
      products: items.map((item) => ({
        id: item.id,
        title: item.title,
        selectedIngredients: item.selectedIngredients,
        excludedIngredients:item.excludedIngredients,
        selectedSauce: item.selectedSauce,
        price: item.price,
      })),
      totalPrice,
      comment:''
    };
    dispatch(setOrder(order));
  }, []);

  const handlePhoneNumberChange = (event) => {
    dispatch(setPhoneNumber(event.target.value));
  };

  const handlePayment = () => {
    // Дополнительная логика обработки оплаты
  };

  return (
    <div className='container'>
    <div className="payment-container">
    <h1>Оплата</h1>
    <div className="payment-details">
      <div className="user-details">
        <h4>Ваше имя</h4>
        <input type="text" value={name} readOnly className="payment-input" />
        <br />
        <h4>Телефон</h4>
        <input
          type="tel"
          placeholder="Введите номер"
          minLength={10}
          onChange={handlePhoneNumberChange}
          className="payment-input"
        />
      </div>
      <div className="order-details">
        <h2>Ваш заказ</h2>
        {items.map((item) => (
          <div key={item.id} className="order-item">
            <h3>{item.title}</h3>
            {item.selectedIngredients.length!=0 && <p className="order-detail-ingredients">
              1x {item.selectedIngredients.join(', ')}
            </p>}
            {item.excludedIngredients!=0 && <p className="order-detail-ingredients">
              1x {item.excludedIngredients.join(', ')}
            </p>}
            {item.selectedSauce && (
              <p className="order-detail">
                <strong>Соус:</strong> {item.selectedSauce}
              </p>
            )}
            <p className="order-detail">
              <strong>Стоимость:</strong> {item.price} грн
            </p>
            <p className="order-detail">
              <strong>Количество:</strong> {item.count}
            </p>
          </div>
        ))}
        <div className="order-item">
          <p className="order-detail">
            <strong>Итого к оплате:</strong> {totalPrice} грн
          </p>
        </div>
        <button onClick={handlePayment} className="payment-button">Оплатить</button>
      </div>
    </div>
  </div>  
  </div>
  );
};
