import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchCart, createItems } from "../../store/Actions/Cart";

function ProductList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts } = useSelector(state => state.productsReducer);
  const { cartUuid } = useSelector(state => state.cartReducer);

  useEffect(() => {
    dispatch(fetchCart())
  },[dispatch])
  
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

  const productClickHandler = (uuid) => {
    navigate(`/product/${uuid}`)
  }

  const productsData = allProducts?.products?.map((product) => {
    return (
      <div key={product.uuid}>
        <p onClick={() => productClickHandler(product.uuid)}>{product.category}</p>
        <p onClick={() => productClickHandler(product.uuid)}>{product.title}</p>
        <p onClick={() => productClickHandler(product.uuid)}>{product.description}</p>
        <p onClick={() => productClickHandler(product.uuid)}>{product.price}</p>
        <button onClick={() => addToCartHandler(product.id)}>Add to cart</button>
      </div>
    );
  });

  return <div>{productsData}</div>;
}

export default ProductList;
