import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchTerm });
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
    />
  );

  return (
    <form onSubmit={searchHandler}>
      {searchInput}
      <button type="submit">🔎</button>
    </form>
  );
}

export default SearchBar;
