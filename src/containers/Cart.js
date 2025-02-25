import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchCart } from "../store/Actions/Cart";
import { fetchAddresses } from "../store/Actions/Address";
import { updateItem, deleteItem } from "../store/Actions/Cart";
import { createOrder } from "../store/Actions/Order";
import { checkToken } from "../utils/helpers";

function Cart() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();
  const { items, cartUuid } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const { addresses } = useSelector((state) => state.addressReducer);
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchAddresses());
  }, [dispatch]);

  const addClickHandler = async (item) => {
    const newQuantity = item.quantity + 1;
    await dispatch(updateItem(item.uuid, newQuantity, cartUuid));
  };

  const subtractClickHandler = async (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateItem(item.uuid, newQuantity, cartUuid));
    } else {
      dispatch(deleteItem(item.uuid, cartUuid));
      dispatch(fetchCart());
    }
  };

  const totalPrice = items
    ?.map((item) => {
      return item.Product.price;
    })
    .reduce((acc, curr) => acc + curr, 0);

    const totalItems = items.map((item) => {
      return item.quantity
    }).reduce((acc,curr) => acc+curr,0)

  const cart = items?.map((item) => {
    return (
      <div key={item.uuid}>
        <p>{item.Product.title}</p>
        <p>{item.Product.category}</p>
        <p>{item.Product.description}</p>
        <p>{item.Product.price}</p>
        <p>{item.quantity}</p>
        <button onClick={() => subtractClickHandler(item)}>-</button>
        <button onClick={() => addClickHandler(item)}>+</button>
      </div>
    );
  });

  const noItems = (
    <div>
      <p>Your cart is empty</p>
      <Link to="/">Add items</Link>
    </div>
  );

  const contentToRender = items?.length ? (
    <div>
      {cart} 
      <p>Subtotal ({totalItems} items) : ${totalPrice}</p>
    </div>
  ) : (
    noItems
  );

  return contentToRender;
}

export default Cart;
