import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../assets/css/productList.css";
import photo from "../../assets/images/samsung.jpg";
import notFound from "../../assets/images/no-item-found.png";

import {
  fetchCart,
  createItems,
  updateItem,
  deleteItem,
} from "../../store/Actions/Cart";
import { checkToken } from "../../utils/helpers";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();
  const { allProducts } = useSelector((state) => state.productsReducer);
  const { cartUuid, items } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    if (token) dispatch(fetchCart());
  }, [dispatch, token]);

  const addToCartHandler = async (item) => {
    const currentItem = [
      {
        productId: item,
        quantity: 1,
      },
    ];
    const result = await dispatch(createItems(currentItem, cartUuid));
    if (result.success) {
      await dispatch(fetchCart());
    }
  };

  const getCartItemForProduct = (productId) => {
    return items?.find((item) => item?.productId === productId);
  };

  const productClickHandler = (uuid) => {
    navigate(`/product/${uuid}`);
  };

  const categoryClickHandler = (category) => {
    navigate(`/categories?category=${category}`);
  };

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

  const productsData = (
    <div className="product-grid">
      {allProducts?.products?.map((product) => {
        const cartItem = getCartItemForProduct(product.id);
        return (
          <div key={product.uuid} className="product-card">
            <img
              src={photo}
              alt="samsung"
              className="samsung-photo"
              onClick={() => productClickHandler(product.uuid)}
            />
            <p
              className="first-product-desc"
              onClick={() => productClickHandler(product.uuid)}
            >
              {product.title}
            </p>
            <p
              className="rest-product-desc"
              onClick={() => categoryClickHandler(product.category)}
            >
              {product.category}
            </p>
            <p
              className="rest-product-desc"
              onClick={() => productClickHandler(product.uuid)}
            >
              {product.description}
            </p>
            <p
              className="price-product-desc"
              onClick={() => productClickHandler(product.uuid)}
            >
              {`$${product.price}`}
            </p>
            {cartItem ? (
              <div className="quantity-controls">
                <button className="button-added">✔Added!</button>
                <div className="flex-q-btns">
                  <button
                    className="quantity-btn-minus"
                    onClick={() => subtractClickHandler(cartItem)}
                  >
                    -
                  </button>
                  <span className="q-title">{cartItem.quantity}</span>
                  <button
                    className="quantity-btn-plus"
                    onClick={() => addClickHandler(cartItem)}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="button-add"
                onClick={() => addToCartHandler(product.id)}
              >
                Add to cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  const noItems = (
    <div className="flex-empty-cart">
      <img className="no-product-found" src={notFound} alt="nothing-found" />
      <p>No Results Found !</p>
    </div>
  );

  const contentToRender = allProducts?.products?.length
    ? productsData
    : noItems;

  return contentToRender;
}

export default ProductList;
