import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import "../assets/css/pagination.css";

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

  const previousPageHandler = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: Number(currentPage) - 1,
    });
  };

  const nextPage =
    Number(productsData.currentPage) === productsData.totalPages || productsData?.totalPages<=1 ? null : (
      <button onClick={nextPageHandler}> Next &gt; </button>
    );

  const previousPage =
    Number(productsData.currentPage) === 1 || productsData?.totalPages<=1 ? null : (
      <button onClick={previousPageHandler}> &lt; Prev </button>
    );

  const selectedPageHandler = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  };

  function renderedPagination() {
    const totalPages = productsData?.totalPages || 1;
    if (!totalPages || totalPages <= 1) return null;

    const pages = [];
    const current = Number(currentPage);
    pages.push(1);

    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) pages.push(i);
    }
    if (end < totalPages - 1) pages.push("...");
    if (totalPages !== 1) pages.push(totalPages);

    return pages;
  }

  const renderedPages = renderedPagination()?.map((page, index) =>
    page === "..." ? (
      <span key={`ellipsis-${index}`}>...</span>
    ) : (
      <button
        key={page}
        className={Number(currentPage) === page ? "active" : ""}
        onClick={() => selectedPageHandler(page)}
        disabled={page === "..."}
      >
        {page}
      </button>
    )
  );

  return (
    <div className="pagination-wrapper">
      <div className="pagination-container">
        {previousPage}
        {renderedPages}
        {nextPage}
      </div>
    </div>
  );
}

export default Pagination;
