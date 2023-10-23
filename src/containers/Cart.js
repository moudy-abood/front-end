import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "../store/Actions/Cart";
import { updateItem, deleteItem } from "../store/Actions/Items";

function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const { status, items } = useSelector((state) => state.cartReducer);
  const [, setQuantity] = useState(0);

  const addClickHandler = (item) => {
    item.quantity = item.quantity + 1;
    setQuantity(item.quantity);
    dispatch(updateItem(item));
  };

  const subtractClickHandler = (item) => {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      setQuantity(item.quantity);
      dispatch(updateItem(item));
    } else {
      dispatch(deleteItem(item.uuid));
    }
  };

  let itemsData = items.map((item) => (
    <div key={item?.uuid}>
      <p>category: {item?.Product.category}</p>
      <p>description: {item?.Product.description}</p>
      <p>title: {item?.Product.title}</p>
      <p>price: {item?.Product.price}</p>
      <p>quantity: {item?.quantity}</p>
      <button onClick={() => addClickHandler(item)}>+</button>
      <button onClick={() => subtractClickHandler(item)}>-</button>
    </div>
  ));

  return (
    <div>
      <p>{status}</p>
      {itemsData}
    </div>
  );
}

export default Cart;
