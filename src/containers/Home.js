import React, { useState } from "react";

import ProductList from "./Products/ProductsList";
import SearchBar from "./Header/SearchBar";
import Dropdown from "./Header/Categories";

function HomeCopy() {
  const [showProducts, setShowProducts] = useState(true);

  return (
    <div>
      <Dropdown setShowProducts={setShowProducts}/>
      <SearchBar setShowProducts={setShowProducts} />
      <ProductList showProducts={showProducts} />
    </div>
  );
}

export default HomeCopy;
