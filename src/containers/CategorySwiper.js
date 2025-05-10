import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../store/Actions/Product";

import "../assets/css/categorySlider.css";

function CategorySwiper() {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.productsReducer);
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 11;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOptionClick = (category) => {
    navigate(`/categories?category=${category}`);
  };

  const handlePrevArrow = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextArrow = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, Math.max(0, category.length - visibleCount))
    );
  };

  const visibleCategories = category.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <div className="category-swiper-container">
      <button onClick={handlePrevArrow} className="category-arrow left">
        ◀
      </button>
      <div className="category-flex">
        {visibleCategories.map((cat, i) => (
          <p
            key={i}
            onClick={() => handleOptionClick(cat.category)}
            className="category-item"
          >
            <span className="category-text">{cat.category}</span>
          </p>
        ))}
      </div>
      <button onClick={handleNextArrow} className="category-arrow right">
        ▶
      </button>
    </div>
  );
}

export default CategorySwiper;
