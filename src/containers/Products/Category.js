import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Pagination from "../../components/Pagination";
import { getCategoryProducts } from "../../store/Actions/Product";
import { optionsHelper } from "../../utils/helpers";

function Category() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const options = useMemo(() => optionsHelper(searchParams), [searchParams]);

  const { productsByCategory } = useSelector((state) => state.productsReducer);

  useEffect(() => {
    dispatch(getCategoryProducts(options));
  }, [dispatch, options]);

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
