import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchCart } from "../store/Actions/Cart";
import { updateItem, deleteItem } from "../store/Actions/Cart";
import { checkToken } from "../utils/helpers";

import "../assets/css/cart.css";
import samsungPhoto from "../assets/images/samsung.jpg";
import emptyCart from "../assets/images/empty-cart.png";

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

  const cart = (
    <div>
      <h2 className="title">Shopping Cart</h2>
      <div className="grid-cart">
        {items?.map((item) => (
          <div className="cart-card" key={item.uuid}>
            <img className="samsung" src={samsungPhoto} alt="samsung" />
            <div className="flex-desc">
              <p>{item.Product.title}</p>
              <p>{item.Product.category}</p>
              <p>{item.Product.description}</p>
              <p>${item.Product.price}</p>
            </div>
            <div className="quantity-btns">
              <button onClick={() => subtractClickHandler(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addClickHandler(item)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const orderNavigationHandler = () => {
    navigate(`/order`);
  };

  const noItems = (
    <div className="flex-empty-cart">
      <img className="empty-cart-photo" src={emptyCart} alt="empty-cart" />
      <p>Your cart is empty!</p>
      <Link to="/">Add Items</Link>
    </div>
  );

  const contentToRender = items?.length ? (
    <div>
      <div className="flex-cart-wrapper">
        {cart}
        <div className="flex-total">
          <span>
            Subtotal ({totalItems} items) : ${totalPrice}
          </span>
          <button onClick={() => orderNavigationHandler()}>
            Proceed to checkout
          </button>
          <p>
            <span>PLACE</span>
            <span>YOUR</span>
            <span>ADS</span> <span>HERE</span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div>{noItems}</div>
  );

  return contentToRender;
}

export default Cart;
