import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

import ProductList from "./Products/ProductsList";
import SearchBar from "./Header/SearchBar";
import Categories from "./Header/Categories";
import { fetchAllProducts } from "../store/Actions/Product";
import Pagination from "../components/Pagination";
import { checkToken, optionsHelper } from "../utils/helpers";

function Home() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const options = useMemo(() => optionsHelper(searchParams), [searchParams]);
  const isLoggedIn = checkToken();

  //profile component is not ready yet

  //not sure if this is the right approach for this
  const loginStatus = isLoggedIn ? (
    <Link to="/profile">Profile</Link>
  ) : (
    <Link to="/sign-up">Sign Up</Link>
  );

  useEffect(() => {
    dispatch(fetchAllProducts(options));
  }, [dispatch, options]);

  return (
    <div>
      {loginStatus}
      <Categories />
      <SearchBar />
      <ProductList />
      <Pagination />
    </div>
  );
}

export default Home;
