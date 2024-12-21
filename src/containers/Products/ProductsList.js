import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/Actions/Products";

function ProductList({ showProducts }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products } = useSelector((state) => state.productsReducer);

  if (!showProducts) {
    return null;
  }

  const nextPageHandler = () => {
    const nextPage = Number(products.currentPage) + 1;
    dispatch(fetchProducts(nextPage));
  };

  const nextPage =
    Number(products.currentPage) === products.totalPages ? null : (
      <button onClick={nextPageHandler}>next</button>
    );

  const chosenPageHandler = (page) => {
    dispatch(fetchProducts(page));
  };

  const pages = [];
  for (let i = products?.totalPages; i >= 1; i--) {
    pages.unshift(i);
  }

  const renderedPages = pages?.map((page) => {
    return (
      <button key={page} onClick={() => chosenPageHandler(page)}>
        {page}
      </button>
    );
  });

  const productsData = products?.products?.map((product) => {
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
      {productsData}
      {renderedPages}
      {nextPage}
    </div>
  );
}

export default ProductList;
