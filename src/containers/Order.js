import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders, updateOrder, deleteOrder } from "../store/Actions/Order";

function Orders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.orderReducer);

  const dispatchClickHandler = (uuid, dispatched) => {
    dispatch(updateOrder(uuid, dispatched))
  }
  
  const deliveredClickHandler = (uuid, delivered) => {
    dispatch(updateOrder(uuid, delivered))
  }

  const deleteOrderHandler = (uuid) =>{
    dispatch(deleteOrder(uuid));
  }


  let ordersList = "";
  if (orders.length) {
    ordersList = orders.map((order) => {
      return (
        <div key={order.uuid}>
          <p>country: {order.Address.country}</p>
          <p>city: {order.Address.city}</p>
          <p>street: {order.Address.street}</p>
          <p>postalCode: {order.Address.postalCode}</p>
          <button onClick={() => dispatchClickHandler(order.uuid,'DISPATCHED')}>Dispatch</button>
          <button onClick={() => deliveredClickHandler(order.uuid,'DELIVERED')}>Delivered</button>
          <button onClick={() => deleteOrderHandler(order.uuid)}>Delete</button>
        </div>
      );
    });
  }
  return  ordersList ;
}

export default Orders;
