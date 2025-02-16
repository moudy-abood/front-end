import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

function Pagination() {
  const location = useLocation().pathname;
  const [searchParams, setSearchParams] = useSearchParams();

  const { allProducts, productsByCategory } = useSelector(
    (state) => state.productsReducer
  );
  const currentPage = searchParams.get("page") || 1;

  const productsMapper = {
    "/categories": productsByCategory,
    default: allProducts,
  };

  const productsData = productsMapper[location] || productsMapper.default;

  const nextPageHandler = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: Number(currentPage) + 1,
    });
  };

  const nextPage =
    Number(productsData.currentPage) === productsData.totalPages ? null : (
      <button onClick={nextPageHandler}>next</button>
    );

  const selectedPageHandler = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  };

  const pages = [];
  for (let i = productsData?.totalPages; i >= 1; i--) {
    pages.unshift(i);
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
