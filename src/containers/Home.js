import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

import ProductList from "./Products/ProductsList";
import SearchBar from "./Header/SearchBar";
import Categories from "./Header/Categories";
import { fetchAllProducts } from "../store/Actions/Product";
import Pagination from "../components/Pagination";
import { optionsHelper } from "../utils/helpers";

function Home() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const options = useMemo(() => optionsHelper(searchParams), [searchParams]);

  useEffect(() => {
    dispatch(fetchAllProducts(options));
  }, [dispatch, options]);

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
