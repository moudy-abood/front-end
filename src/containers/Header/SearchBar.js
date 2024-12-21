import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../store/Actions/Products";

function SearchBar({ setShowProducts }) {
  const dispatch = useDispatch();

  const { search } = useSelector((state) => state.productsReducer);

  const [searchTerm, setSearchTerm] = useState("");
  const [showNextPage, setShowNextPage] = useState(false);

  const searchHandler = (data) => {
    if (data.length && data) {
      dispatch(searchProducts(data));
      setShowNextPage(true);
      setShowProducts(false);
      setSearchTerm("");
    }
  };

  const inputChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchData = search?.products?.map((product) => {
    return (
      <div key={product.uuid}>
        <p>{product.category}</p>
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    );
  });

  const nextPageHandler = () => {
    const nextPage = Number(search.currentPage) + 1;
    dispatch(searchProducts(nextPage));
  };

  const nextPage =
    Number(search.currentPage) === search.totalPages ? null : (
      <button onClick={nextPageHandler}>next</button>
    );

  const chosenPageHandler = (page) => {
    dispatch(searchProducts(page));
  };

  const pages = [];
  for (let i = search?.totalPages; i >= 1; i--) {
    pages.unshift(i);
  }

  const renderedPages = pages?.map((page) => {
    return (
      <button key={page} onClick={() => chosenPageHandler(page)}>
        {page}
      </button>
    );
  });

  const searchInput = (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={inputChangeHandler}
    ></input>
  );

  return (
    <div>
      {searchInput}
      <button onClick={() => searchHandler(searchTerm)}>🔎</button>
      {searchData}
      {renderedPages}
      {showNextPage ? nextPage : null}
    </div>
  );
}

export default SearchBar;
