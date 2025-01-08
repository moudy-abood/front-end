import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectedPage } from "../store/Actions/Products";

function Pagination() {
  const location = useLocation().pathname;

  const { allProducts, productsByCategory } = useSelector(
    (state) => state.productsReducer
  );
  const dispatch = useDispatch();

  const nextPageHandler = () => {
    const nextPage =
      location === "/category"
        ? Number(productsByCategory.currentPage) + 1
        : Number(allProducts.currentPage) + 1;
    dispatch(selectedPage(nextPage));
  };

  const nextPage =
    location === "/category" ? (
      Number(productsByCategory.currentPage) ===
      productsByCategory.totalPages ? null : (
        <button onClick={nextPageHandler}>next</button>
      )
    ) : Number(allProducts.currentPage) === allProducts.totalPages ? null : (
      <button onClick={nextPageHandler}>next</button>
    );

  const selectedPageHandler = (page) => {
    dispatch(selectedPage(page));
  };

  const pages = [];
  if (location === "/category") {
    for (let i = productsByCategory?.totalPages; i >= 1; i--) {
      pages.unshift(i);
    }
  } else {
    for (let i = allProducts?.totalPages; i >= 1; i--) {
      pages.unshift(i);
    }
  }

  const renderedPages = pages?.map((page) => {
    return (
      <button key={page} onClick={() => selectedPageHandler(page)}>
        {page}
      </button>
    );
  });

  return (
    <div>
      {renderedPages}
      {nextPage}
    </div>
  );
}

export default Pagination;
