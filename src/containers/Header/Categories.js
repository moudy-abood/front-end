import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllProducts } from "../../store/Actions/Products";
import { getByCategory } from "../../store/Actions/Products";

const Dropdown = ({ setShowProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chosenPage, setChosenPage] = useState('')

  const dispatch = useDispatch();

  const { allProducts, category } = useSelector((state) => state.productsReducer);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  const handleOptionClick = (data) => {
    dispatch(getByCategory(data))
    setChosenPage(data)
    setShowProducts(false);
    setIsOpen(false);
  };
  

  const productsByCategory = category?.products?.map((product)=> {
    return (
      <div key={product.uuid}>
        <p>{product.category}</p>
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    )
  })  

    const nextPageHandler = () => {
      const nextPage = Number(category.currentPage) + 1;
      dispatch(getByCategory(chosenPage, nextPage));
    };
  
    const nextPage = Number(category.currentPage??1) === (category.totalPages?? 1) ? null : (
        <button onClick={nextPageHandler}>next</button>
      );
  
    const chosenPageHandler = (page) => {  
      dispatch(getByCategory(chosenPage, page));
    };
  
    const pages = [];
    for (let i = category?.totalPages; i >= 1; i--) {
      pages.unshift(i);
    }
  
    const renderedPages = pages?.map((page) => {
      return (
        <button key={page} onClick={() => chosenPageHandler(page)}>
          {page}
        </button>
      );
    });

  const allCategories = allProducts?.map((category) => {
    return (
      <div key={category.uuid}>
        <li onClick={() => handleOptionClick(category.category)}>{category.category}</li>
      </div>
    );
  });

  return (
    <div>
      <button onClick={toggleDropdown}>Categories</button>
      {isOpen && <ul>{allCategories}</ul>}
      {productsByCategory}
      {renderedPages}
      {nextPage}
    </div>
  );
};

export default Dropdown;
