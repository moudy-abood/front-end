import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { searchProducts } from "../../store/Actions/Products";

function SearchBar() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (data) => {
    if (data.length && data) {
      dispatch(searchProducts(data));
      setSearchTerm("");
    } else {
      dispatch(searchProducts(''));
    }
  };

  const inputChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchInput = (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={inputChangeHandler}
    ></input>
  );

  return (
    <div>
      {searchInput}
      <button onClick={() => searchHandler(searchTerm)}>🔎</button>
    </div>
  );
}

export default SearchBar;
