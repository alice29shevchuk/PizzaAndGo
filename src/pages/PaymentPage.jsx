import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder } from '../redux/slices/paymentSlice';
import { cartSelector } from '../redux/slices/cartSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import StripeCheckout from 'react-stripe-checkout';
import {useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id,name,email } = useSelector((state) => state.user);
  const { totalPrice, items } = useSelector(cartSelector);
  const [phone, setPhone] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [isPhoneValid, setIsPhoneValid] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const [orderNumber, setOrderNumber] = React.useState('');
  useEffect(() => {
    const order = {
      number:orderNumber,
      id,
      name,
      email,
      phoneNumber: phone,
      products: items.map((item) => ({
        id: item.id,
        title: item.title,
        selectedIngredients: item.selectedIngredients,
        excludedIngredients:item.excludedIngredients,
        selectedSauce: item.selectedSauce,
        price: item.price,
        count:item.count
      })),
      totalPrice,
      comment:comment,
      paymentMethod:paymentMethod,
      orderData:new Date().toISOString(),
    };
    dispatch(setOrder(order));
    console.log(order);
  }, [phone, comment, items, totalPrice, dispatch, name, email,paymentMethod,id]);
  const handlePhoneChange = (value, data, event, formattedValue) => {
    setIsPhoneValid(value.length==12);
    setPhone(value);
  };
  const onToken = (token) => {
    alert('Платеж успешно обработан!');
    navigate('/order');
  };
  const handlePayment = () => {
    // alert(`Оплата методом ${paymentMethod}`);
    navigate('/order');
  };
  const handlePaymentMethodChange=(event)=>{
    setPaymentMethod(event.target.value);
  }
  useEffect(() => {
    const generatedOrderNumber = uuidv4();
    setOrderNumber(generatedOrderNumber);
  }, []);
  return (
    <div className='container'>
    <div className="payment-container">
    <h1>Оплата</h1>
    <div className="payment-details">
      <div className="user-details">
        <h1>Id</h1>
        <input type="text" value={id} readOnly/>
        <h4>Ваше имя</h4>
        <input type="text" value={name} readOnly className="payment-input" />
        <br />
        <h4>Ваш email</h4>
        <input type="text" value={email} readOnly className="payment-input" />
        <br />
        <h4>Телефон</h4>
        <PhoneInput required={true} country={'ua'} onlyCountries={['ua']}value={phone} onChange={(value, data, event, formattedValue) => {
                handlePhoneChange(value, data, event, formattedValue);
              }}/>
        <br />
        <div className="payment-method">
              <h4>Выберите способ оплаты</h4>
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={handlePaymentMethodChange}
                />
                Карта
              </label>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                />
                Наличные
              </label>
            </div>
            <br />
        <h4>Комментарий к заказу</h4>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={100} className="payment-input-comment"/>
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
        {paymentMethod === 'card' && (
              <StripeCheckout
                token={onToken}
                className={`${isPhoneValid ? 'payment-button ' : 'payment-button-disabled'}`} disabled={!isPhoneValid}

                stripeKey="pk_test_51OaFvPBBmu82HAlB4dh6Kc8i9RC4oE0Q4H5SBnWdXKtbH3xnqQpeBoOeiZdLgtjHFePZRctazLqIOCht8oX1jrKO00WqWHsqMu"
                amount={totalPrice * 100}
                name="Pizza and Go"
                description="Оплата за заказ"
                email={email}
                currency="UAH"
              />
        )}
        {paymentMethod==='cash' && (
        <button onClick={handlePayment} className={`${isPhoneValid ? 'payment-button ' : 'payment-button-disabled'}`} disabled={!isPhoneValid}>Оплатить</button> 
        )}
      </div>
    </div>
  </div>  
  </div>
  );
};
