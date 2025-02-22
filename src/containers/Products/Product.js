import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "../../store/Actions/Product";
import { fetchCart, createItems } from "../../store/Actions/Cart";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {uuid} = useParams();

  useEffect(() => {
    dispatch(fetchProduct(uuid));
    dispatch(fetchCart());
  }, [dispatch, uuid]);

  const { product } = useSelector((state) => state.productsReducer);
  const { cartUuid } = useSelector((state) => state.cartReducer);

  const addToCartHandler = async (item) => {
    const currentItem = [
      {
        productId: item,
        quantity: 1,
      },
    ];
    const result = await dispatch(createItems(currentItem, cartUuid));
    if (result.success) {
      navigate("/cart");
    }
  };

  const displayedProduct = (
    <div key={product?.uuid}>
      <p>{product?.category}</p>
      <p>{product?.title}</p>
      <p>{product?.description}</p>
      <p>{product?.price}</p>
      <button onClick={() => addToCartHandler(product?.id)}>Add to cart</button>
    </div>
  );

  return displayedProduct;
}

export default Product;
