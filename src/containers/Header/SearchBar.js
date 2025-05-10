import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import searchIcon from "../../assets/images/search.svg";
import "../../assets/css/searchBar.css";

function SearchBar() {

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    newParams.set('search', searchTerm);
    if (window.location.pathname !== '/') {
      navigate(`/?${newParams.toString()}`);
    } else {
      setSearchParams({ search: searchTerm });
    }
  };

  const inputChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchInput = (
    <input
    className="search-input"
      name="search"
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={inputChangeHandler}
    />
  );

  return (
    <form onSubmit={searchHandler} className="search-form">
      <div className="search-bar">
      {searchInput}
      <button type="submit" className="search-button"><img src={searchIcon} alt="search" className="search-icon"/></button>
      </div>
    </form>
  );
}

export default SearchBar;
