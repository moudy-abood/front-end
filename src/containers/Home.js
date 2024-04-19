import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { fetchProducts } from "../store/Actions/Products";
import { searchProducts } from "../store/Actions/Products";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products } = useSelector((state) => state.productsReducer);
  const { search } = useSelector((state) => state.productsReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const [shownPages, setShownPages] = useState(false);
  const inputChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  }

  const searchHandler = (data) => {
    if(data.length){
      dispatch(searchProducts(data))
      setShownPages(true);
    } else {
      setShownPages(false);
    }
  }


  const nextPageHandler = () => {
    const nextPage = Number(products.currentPage) + 1;
    dispatch(fetchProducts(nextPage));
  };

  const firstPageHandler = () => {
    dispatch(fetchProducts(1));
  };

  const chosenPageHandler = (selectedPage) => {
    dispatch(fetchProducts(selectedPage));
  };

  const pages = [];
  for (let i = products?.totalPages; i >= 1; i--) {
    pages.unshift(i);
  }

  const searchPages =  [];
  for (let i = search?.totalPages; i >= 1; i--) {
    searchPages.unshift(i);
  }
  const renderedPages = pages?.map((page) => (
    <button key={page} onClick={() => chosenPageHandler(page)}>
      {page}
    </button>
  ));

  const renderedSearchPages = searchPages?.map((page) => (
    <button key={page} onClick={() => chosenPageHandler(page)}>
      {page}
    </button>
  ));

  const productsData = products.products?.map((product) => {
    return (
      <div key={product.uuid}>
        <p>{product.category}</p>
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    );
  });
  const searchData = search.products?.map((product) => {
    return (
      <div key={product.uuid}>
        <p>{product.category}</p>
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    );
  });
  const firstPage = shownPages ? (
    Number(search.currentPage) >= 4 ? (
      <button onClick={firstPageHandler}>first</button>
    ) : null
  ) : (
    Number(products.currentPage) >= 4 ? (
      <button onClick={firstPageHandler}>first</button>
    ) : null
  );
  console.log(search.currentPage)
  const nextPage = shownPages ? (
    Number(search.currentPage) === search.totalPages? null : (
      <button onClick={nextPageHandler}>next</button>
    )
  ) : (
    Number(products.currentPage) === products.totalPages? null : (
      <button onClick={nextPageHandler}>next</button>
    )
  )

  return (
    <div>
          <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={inputChangeHandler}
      />
      <button onClick={() => searchHandler(searchTerm)}>Search</button>
    </div>
      {shownPages? searchData : productsData}
      {firstPage}
      {shownPages? renderedSearchPages : renderedPages}
      {nextPage}
    </div>
  );
}

export default Home;
