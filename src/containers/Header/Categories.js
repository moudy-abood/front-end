import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../../store/Actions/Product";

function Categories() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.productsReducer);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (category) => {
    navigate(`/categories?category=${category}`);
  };

  const allCategories = category?.map((category, i) => {
    return (
      <div key={i}>
        <li onClick={() => handleOptionClick(category.category)}>
          {category.category}
        </li>
      </div>
    );
  });

  return (
    <div>
      <button onClick={toggleDropdown}>Categories</button>
      {isOpen && <ul>{allCategories}</ul>}
    </div>
  );
}

export default Categories;
