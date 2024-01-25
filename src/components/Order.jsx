import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder } from '../redux/slices/paymentSlice';
export const Order = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const storedOrder = sessionStorage.getItem('order');
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      dispatch(setOrder(parsedOrder));
    }
  }, []);
    const {order}=useSelector((state)=>state.payment);
    return (
    <div className='container'>
    <div className='order-totaldetails'>
        <h4>Ваш заказ №{order.number}</h4>
        <p>Заказ оформлен на: <span>{order.orderData}</span></p>
        {order.products.map((product) => (
            <div key={product.id} className='product-item'>
                <h4>{product.title} ({product.count}x)</h4>
                {product.excludedIngredients.length!=0 && <p>{product.excludedIngredients.join(', ')}</p>}
                {product.selectedIngredients.length!=0 &&<p>{product.selectedIngredients.join(', ')}</p>}
                {product.selectedSauce!="" && <p>{product.selectedSauce}</p>}
            </div>
        ))}
        <p className='total-price'>Сумма к оплате в магазине: <span>{order.totalPrice} грн</span></p>
    </div>
    <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
              </svg>

              <span>На Главную</span>
            </Link>
    </div>
    </div>
  )
}
