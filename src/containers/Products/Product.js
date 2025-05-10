import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import photo from "../../assets/images/samsung.jpg";
import "../../assets/css/singleProduct.css";

import { fetchProduct } from "../../store/Actions/Product";
import {
  fetchCart,
  createItems,
  updateItem,
  deleteItem,
} from "../../store/Actions/Cart";
import { checkToken } from "../../utils/helpers";

function Product() {
  const dispatch = useDispatch();
  const token = checkToken();
  const { uuid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProduct(uuid));
    if (token) dispatch(fetchCart());
  }, [dispatch, uuid, token]);

  const { product } = useSelector((state) => state.productsReducer);
  const { cartUuid, items } = useSelector((state) => state.cartReducer);

  const getCartItemForProduct = (productId) => {
    return items?.find((item) => item?.productId === productId);
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
  const cartItem = getCartItemForProduct(product.id);

  const displayedProduct = (
    <div key={product?.uuid} className="product-card1">
      <div className="flex-photo-desc">
        <div>
          <img src={photo} alt="samsung" className="single-product-photo" />
        </div>
        <div className="single-product-flex">
          <p className="first-desc">{product?.title}</p>
          <p
            className="product-desc"
            onClick={() => categoryClickHandler(product.category)}
          >
            {product?.category}
          </p>
          <p className="product-desc">{product?.description}</p>
          <p className="price-desc">{`$${product?.price}`}</p>
        </div>
      </div>
      {cartItem ? (
        <div className="added-quantity">
          <button className="added-btn">✔Added!</button>
          <div className="flex-btns2">
            <div className="quantity-div">
              <span className="span-quantity">Quantity</span>
            </div>
            <div className="btns-div">
              <button
                className="minus-btn"
                onClick={() => subtractClickHandler(cartItem)}
              >
                -
              </button>
              <span className="quantity-title">{cartItem.quantity}</span>
              <button
                className="plus-btn"
                onClick={() => addClickHandler(cartItem)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="add-btn">
          <button onClick={() => addToCartHandler(product.id)}>
            Add to cart
          </button>
        </div>
      )}
    </div>
  );

  return <div>{displayedProduct}</div>;
}

export default Product;
