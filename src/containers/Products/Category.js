import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import "../../assets/css/productList.css";
import photo from "../../assets/images/samsung.jpg";

import Pagination from "../../components/Pagination";
import { getCategoryProducts } from "../../store/Actions/Product";
import { optionsHelper, checkToken } from "../../utils/helpers";
import {
  fetchCart,
  createItems,
  updateItem,
  deleteItem,
} from "../../store/Actions/Cart";

function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();

  const [searchParams] = useSearchParams();
  const options = useMemo(() => optionsHelper(searchParams), [searchParams]);
  const { cartUuid, items } = useSelector((state) => state.cartReducer);

  const { productsByCategory } = useSelector((state) => state.productsReducer);

  useEffect(() => {
    if (token) dispatch(fetchCart());
    dispatch(getCategoryProducts(options));
  }, [dispatch, options, token]);

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

  const productClickHandler = (uuid) => {
    navigate(`/product/${uuid}`);
  };

  const getCartItemForProduct = (productId) => {
    return items?.find((item) => item?.productId === productId);
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

  const products = (
    <div className="product-grid">
      {productsByCategory?.products?.map((product) => {
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
            <p className="rest-product-desc">{product.category}</p>
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
                <span className="quantity-display">
                  Quantity {cartItem.quantity}
                </span>
                <button
                  className="quantity-btn"
                  onClick={() => subtractClickHandler(cartItem)}
                >
                  -
                </button>
                <button
                  className="quantity-btn"
                  onClick={() => addClickHandler(cartItem)}
                >
                  +
                </button>
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

  return (
    <div>
      {products}
      <Pagination />
    </div>
  );
}

export default Category;
