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

  const loginStatus = isLoggedIn ? (
    <div>
      <div><Link to="/profile">Profile</Link></div>
      <div><Link to="/cart">🛒</Link></div>
    </div>
  ) : (
    <Link to="/sign-up">Sign Up</Link>
  );

  useEffect(() => {
    dispatch(fetchAllProducts(options));
    window.scrollTo({ top: 0, behavior: "smooth" });
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
