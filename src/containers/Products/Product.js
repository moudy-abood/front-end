import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "../../store/Actions/Product";
import { fetchCart, createItems } from "../../store/Actions/Cart";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productUuid = searchParams.get("product");

  useEffect(() => {
    dispatch(fetchProduct(productUuid));
    dispatch(fetchCart());
  }, [dispatch, productUuid]);

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
