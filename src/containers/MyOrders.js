import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchOrders } from "../store/Actions/Order";
import { checkToken } from "../utils/helpers";

function MyOrders() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  // this <p>--------------------------</p> are used to see data more clearly for now and are temporary until the design is done.

  const { orders } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(fetchOrders());
  }, [dispatch, token, navigate]);

  const ordersData = orders?.map((order) => {
    return (
      <div key={order.uuid}>
        {order.Cart.Items.map((item, i) => {
          return (
            <div key={i}>
              <p>{item.Product.category}</p>
              <p>{item.Product.title}</p>
              <p>{item.Product.description}</p>
              <p>{item.Product.price}</p>
              <p>--------------------------</p>
            </div>
          );
        })}
        <div>
          <p>{order.Address?.country}</p>
          <p>{order.Address?.city}</p>
          <p>{order.Address?.street}</p>
          <p>{order.Address?.postalCode}</p>
          <p>--------------------------</p>
        </div>
        <div>
          <p>{order.temporaryAddress?.city}</p>
          <p>{order.temporaryAddress?.country}</p>
          <p>{order.temporaryAddress?.street}</p>
          <p>{order.temporaryAddress?.postalCode}</p>
          <p>--------------------------</p>
        </div>
        <p>{order.status}</p>
        <p>{order.total}</p>
        <p>--------------------------</p>
      </div>
    );
  });
  return <div>{ordersData}</div>;
}

export default MyOrders;
