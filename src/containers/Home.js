import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import "../assets/css/home.css";

import ProductList from "./Products/ProductsList";
import CategorySwiper from "./CategorySwiper";
import { fetchAllProducts } from "../store/Actions/Product";
import Pagination from "../components/Pagination";
import { optionsHelper } from "../utils/helpers";

function Home() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const options = useMemo(() => optionsHelper(searchParams), [searchParams]);

  useEffect(() => {
    dispatch(fetchAllProducts(options));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, options]);

  return (
    <div>
      <CategorySwiper />
      <div>
        <ProductList />
        <Pagination />
      </div>
    </div>
  );
}

export default Home;
