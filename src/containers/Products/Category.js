import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pagination from "../../components/Pagination";
import { getProductsByCategory } from "../../store/Actions/Products";

function Category() {
  const dispatch = useDispatch();

  const { productsByCategory, page, selectedCategory } = useSelector(
    (state) => state.productsReducer
  );

  useEffect(() => {
    dispatch(getProductsByCategory(selectedCategory, page));
  }, [dispatch, page, selectedCategory]);

  const products = productsByCategory?.products?.map((product) => {
    return (
      <div key={product.uuid}>
        <p>{product.category}</p>
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    );
  });
  return (
    <div>
      {products}
      <Pagination />
    </div>
  );
}

export default Category;
