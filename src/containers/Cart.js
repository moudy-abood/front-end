import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchCart } from "../store/Actions/Cart";
import { updateItem, deleteItem } from "../store/Actions/Cart";
import { checkToken } from "../utils/helpers";

function Cart() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();
  const { items, cartUuid } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    dispatch(fetchCart());
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
      await dispatch(deleteItem(item.uuid, cartUuid));
      await dispatch(fetchCart());
    }
  };

  const totalPrice = items
    ?.map((item) => {
      return item.Product.price * item.quantity;
    })
    .reduce((acc, curr) => acc + curr, 0);

  const totalItems = items
    .map((item) => {
      return item.quantity;
    })
    .reduce((acc, curr) => acc + curr, 0);

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

  const orderNavigationHandler = () => {
    navigate(`/order`);
  };

  const noItems = (
    <div>
      <p>Your cart is empty</p>
      <Link to="/">Add items</Link>
    </div>
  );

  const contentToRender = items?.length ? (
    <div>
      {cart}
      <p>
        Subtotal ({totalItems} items) : ${totalPrice}
      </p>
      <button onClick={() => orderNavigationHandler()}>
        Proceed to checkout
      </button>
    </div>
  ) : (
    noItems
  );

  return contentToRender;
}

export default Cart;
