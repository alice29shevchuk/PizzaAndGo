import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder } from '../redux/slices/paymentSlice';
import { cartSelector,clearProducts } from '../redux/slices/cartSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import StripeCheckout from 'react-stripe-checkout';
import {json, useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import Footer from '../components/Footer';
import CityDepartmentModal from '../components/CityDepartmentModal';
import {clearCity} from '../redux/slices/citySlice';
import {clearDepartment} from '../redux/slices/departmentSlice';
import axios from 'axios';

export const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name , email } = useSelector((state) => state.user);
  const { totalPrice, items } = useSelector(cartSelector);
  const [phone, setPhone] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [isPhoneValid, setIsPhoneValid] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const [orderNumber, setOrderNumber] = React.useState('');
  const idUser = JSON.parse(sessionStorage.getItem('user')).uid;/////////////////////////
  const [orderTime,setOrderTime] = React.useState(getDefaultTime());
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedCityName, setSelectedCityName] = React.useState("");
  const [selectedDepartmentName, setSelectedDepartmentName] = React.useState("");
  const {cities,selectedCityId} = useSelector((state) => state.city);
  const {departments,selectedDepartment} = useSelector((state) => state.department);
  const [selectedCity, setSelectedCity] = React.useState(false);
  //
  //time
  //
  const [currentTime, setCurrentTime] = React.useState(getDefaultTime());
  const [timeOptions, setTimeOptions] = React.useState([]);

  function getDefaultTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    return `${new Date().toISOString().substring(0, 10)} ${now.toTimeString().substring(0, 5)}`;
  }
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    const options = [];
    while (now.getHours() < 22 || (now.getHours() === 22 && now.getMinutes() === 0)) {
      options.push(now.toTimeString().substring(0, 5));
      now.setMinutes(now.getMinutes() + 10);
    }

    setTimeOptions(options);
  }, []);

  const handleTimeChange = (e) => {
    setCurrentTime(e.target.value);
    setOrderTime(`${new Date().toISOString().substring(0, 10)} ${e.target.value}`);
  };
  //
  //
  //
  useEffect(() => {
    const savedOrder = JSON.parse(sessionStorage.getItem('order')) || {};/////////////////////////////
    setPhone(savedOrder.phoneNumber || '');
    setComment(savedOrder.comment || '');
    setPaymentMethod(savedOrder.paymentMethod || 'cash');
    setIsPhoneValid(savedOrder.phoneNumber && savedOrder.phoneNumber.length === 12);
    setOrderTime(savedOrder.orderData || getDefaultTime());
    // setModalIsOpen(false);
  }, []);
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    const savedDepartment = localStorage.getItem('selectedDepartment');
    setSelectedCityName(savedCity || ""); 
    setSelectedDepartmentName(savedDepartment || "");
    // setModalIsOpen(false);
  }, []);
  useEffect(() => {
    const order = {
      number:orderNumber,
      id:idUser,
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
      orderData: orderTime,
      city: selectedCityName,
      department:selectedDepartmentName,
    };
    dispatch(setOrder(order));
    sessionStorage.setItem('order',JSON.stringify(order));///////////////////////////////////
  }, [phone, comment, items, totalPrice, dispatch, name, email,paymentMethod,orderTime,selectedCityName,selectedDepartmentName]);
  useEffect(() => {
    const generatedOrderNumber = uuidv4();
    setOrderNumber(generatedOrderNumber);
  }, []);
  const handlePhoneChange = (value, data, event, formattedValue) => {
    setIsPhoneValid(value.length==12);
    // setPhone(formattedValue);
    setPhone(value);
  };
  const handlePhoneKeyDown = (event) => {
    if (event.target.value === '+380' && event.key === '0') {
      event.preventDefault();
    }
    const countryCode = event.target.value;
    if (countryCode === '+380' && event.key === 'Backspace') {
      event.preventDefault();
    }
  };
  
  const onToken = (token) => {
    alert('Платеж успешно обработан!');
    navigate('/order');
  };
  const handlePayment = () => {
    if(!selectedCity){
      alert('Выберите город!');
    }else{
      navigate('/order');
      dispatch(clearProducts());
      try{
      const savedOrder = JSON.parse(sessionStorage.getItem('order')) || {};
      const productsInOrders = savedOrder.products.map(product => ({
        id: product.id,
        title: product.title,
        selectedIngredients: product.selectedIngredients.map((ingredient, index) => ({
          id: index + 1, 
          title: ingredient,
          productsInOrdersId: 0,
        })),
        excludedIngredients: product.excludedIngredients.map((ingredient, index) => ({
          id: index+1,
          title: ingredient,
          productsInOrdersId: 0,
        })),
        selectedSauce: product.selectedSauce,
        price: product.price,
        count: product.count,
        ordersid: 0,
      }));
      const orderDataToDB = {
        id: 0,
        numberOfOrder: savedOrder.number,
        idUser: savedOrder.id,
        name: savedOrder.name,
        email: savedOrder.email,
        phoneNumber: savedOrder.phoneNumber,
        productsInOrders: productsInOrders,
        totalPrice: savedOrder.totalPrice,
        comment: savedOrder.comment,
        paymentMethod: savedOrder.paymentMethod,
        orderData: savedOrder.orderData,
        city: savedOrder.city,
        department: savedOrder.department
      };
  const data = {
    "id": orderDataToDB.id,
    "numberOfOrder": orderDataToDB.numberOfOrder,
    "idUser": orderDataToDB.idUser,
    "name": orderDataToDB.name,
    "email": orderDataToDB.email,
    "phoneNumber": orderDataToDB.phoneNumber,
    "productsInOrders": orderDataToDB.productsInOrders.map(product => ({
      "id": 0, 
      "title": String(product.title),
      "selectedIngredients": product.selectedIngredients.map(ingredient => ({
        "id": 0, 
        "title": String(ingredient.title), 
        "productsInOrdersId": 0
      })),
      "excludedIngredients": product.excludedIngredients.map(ingredient => ({
        "id": 0, 
        "title": String(ingredient.title), 
        "productsInOrdersId": 0 
      })),
      "selectedSauce": String(product.selectedSauce), 
      "price": Number(product.price), 
      "count": Number(product.count), 
      "ordersid": 0 
    })),
    "totalPrice": orderDataToDB.totalPrice,
    "comment": orderDataToDB.comment,
    "paymentMethod": orderDataToDB.paymentMethod,
    "orderData": orderDataToDB.orderData,
    "city": orderDataToDB.city,
    "department": orderDataToDB.department,
    "isDone": false
  };
  
    const headers = {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    };
    
    axios.post('http://alisa000077-001-site1.htempurl.com/api/Order/AddOrder', JSON.stringify(data), { headers })
      .then(response => {
        console.log('Успешный ответ:', response.data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Произошла ошибка. Попробуйте позже.');
      }
    }
  };
  const handlePaymentMethodChange=(event)=>{
    setPaymentMethod(event.target.value);
  }
  return (
    <>
    <div className='container'>
    <div className="payment-container">
    <h1>Оплата</h1>
    <div className="payment-details">
      <div className="user-details">
        <h4>Ваше имя</h4>
        <input type="text" value={name} readOnly className="payment-input" />
        <br />
        <h4>Ваш email</h4>
        <input type="text" value={email} readOnly className="payment-input" />
        <br />
        <h4>Телефон</h4>
        <PhoneInput 
        required={true} 
        inputClass="custom-phone-input" 
        placeholder="+380 (99) 999 99 99" 
        country={'ua'} 
        onlyCountries={['ua']} 
        value={phone}  
        inputProps={{
          onKeyDown: (event) => handlePhoneKeyDown(event),
        }} 
        onChange={(value, data, event, formattedValue) => {
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
        <select id="timePicker" name="timePicker" value={orderTime} onChange={handleTimeChange}>
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
        </select>
        <br></br>
        <button onClick={() => setModalIsOpen(true)} className='chooseCityButton'>Выбрать город</button>
        <CityDepartmentModal isOpen={modalIsOpen} onRequestClose={() => {setModalIsOpen(false);dispatch(clearCity());dispatch(clearDepartment())}} onUpdateAddress={() => {
                      const selectedCity = cities.find((city) => city.id === selectedCityId);
                      const cityName = selectedCity ? selectedCity.name : "Unknown city";
                      setSelectedCityName(cityName);
                      
                      const selectedDep = departments.find((department) => department.id === selectedDepartment);
                      console.log(selectedDep);
                      const departmentName = selectedDep ? selectedDep.name : "Unknown department";
                      setSelectedDepartmentName(departmentName);

                      localStorage.setItem('selectedCity', cityName);
                      localStorage.setItem('selectedDepartment', departmentName);
                      setSelectedCity(true);
                      // setModalIsOpen(false);
            }} />
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
                label='Оплатить картой'
                token={handlePayment}
                className={`${isPhoneValid ? 'payment-button-card ' : 'payment-button-card-disabled'}`} //disabled={!isPhoneValid}
                stripeKey="pk_test_51OaFvPBBmu82HAlB4dh6Kc8i9RC4oE0Q4H5SBnWdXKtbH3xnqQpeBoOeiZdLgtjHFePZRctazLqIOCht8oX1jrKO00WqWHsqMu"
                amount={totalPrice * 100}
                name="Pizza and Go"
                description="Оплата за заказ"
                email={email}
                currency="UAH"
              />
        )}
        {paymentMethod==='cash' &&(
        <button onClick={handlePayment} className={`${isPhoneValid ? 'payment-button ' : 'payment-button-disabled'}`} disabled={!isPhoneValid}>Оплатить</button> 
        )}
      </div>
    </div>
  </div>  
  </div>
  <Footer></Footer>
  </>
  );
};
