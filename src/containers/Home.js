import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../store/Actions/Products";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsReducer);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const nextPageHandler = () => {
    const nextPage = Number(products.currentPage) + 1;
    dispatch(fetchProducts(nextPage))
  }

  const firstPageHandler = () => {
    dispatch(fetchProducts(1));
  }

  const chosenPageHandler = (selectedPage) => {
    dispatch(fetchProducts(selectedPage));
  }

  let pages = []
  for( let i = products?.totalPages; i >=1 ; i--){
    pages.unshift(i);
  }

  const renderedPages = pages?.map((page) =>(
    <button key={page} onClick={()=>chosenPageHandler(page)}>{page}</button>
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
    return (
        <div>
            {productsData}
            {Number(products.currentPage)>=4? <button onClick={firstPageHandler}>first</button>: null}
            {renderedPages}
            {Number(products.currentPage)===products.totalPages? null: <button onClick={nextPageHandler}>next</button>}
        </div>
    );
}

export default Home;
