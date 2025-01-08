import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductList from "./Products/ProductsList";
import SearchBar from "./Header/SearchBar";
import Categories from "./Header/Categories";
import { fetchAllProducts } from "../store/Actions/Products";
import Pagination from "../components/Pagination";

function Home() {
  // check if he just opened the site and use his query if it was not the first time or only refreshed etc
  // use search params 'react-router-dom'
  const dispatch = useDispatch();

  const { search, page } = useSelector((state) => state.productsReducer);

  useEffect(() => {
    dispatch(fetchAllProducts(search, page));
  }, [dispatch, search, page]);

  return (
    <div>
      {/* <Link to="/sign-up">Sign Up</Link> */}
      <Categories />
      <SearchBar />
      <ProductList />
      <Pagination />
    </div>
  );
}

export default Home;
