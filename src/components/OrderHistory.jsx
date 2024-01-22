import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const {order}=useSelector((state)=>state.payment);


  return (
    <div>
      <h1>{order.number}</h1>
    </div>
  );
};

export default OrderHistory;
