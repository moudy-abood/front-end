import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProducts,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../../store/Actions/Product";
import { fetchCart, createItems } from "../../store/Actions/Cart";

function CreateProduct() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const { products } = useSelector((state) => state.productsReducer);
  const { cartUuid } = useSelector((state) => state.cartReducer);
  const [isShow, setIsShow] = useState(false);
  const [isShowAll, setIsShowAll] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: 0,
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addHandler = (e) => {
    e.preventDefault();
    const newData = [...data, formData];
    setData(newData);
    setFormData({
      category: "",
      title: "",
      description: "",
      price: 0,
    });
  };
  const showHandler = () => {
    setIsShow(true);
  };

  const showAllHandler = () => {
    setIsShowAll(true);
  };

  const updateHandler = (product) => {
    setIsUpdating(true);
    setFormData({
      uuid: product.uuid,
      category: product.category,
      title: product.title,
      description: product.description,
      price: product.price,
    });
  };

  const handleSaveClick = () => {
    setIsUpdating(false);
    dispatch(updateProduct(formData));
  };

  const addToCartHandler = (item) => {
    const currentItem = [
      {
        productId: item,
        quantity: 1,
      },
    ];
    dispatch(createItems(currentItem, cartUuid));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProducts(data));
    setData([]);
    setIsShow(false);
  };

  const handleDeleteClick = () => {
    setIsUpdating(false);
    dispatch(deleteProduct(formData));
  };

  let productsData = (
    <div>
      <form>
        <div>
          <label>
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            Price
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <button onClick={addHandler}>Add</button>
      </form>
      <button onClick={showHandler}>Show added products</button>
      <button onClick={showAllHandler}>Show all products</button>
    </div>
  );

  if (isShowAll) {
    productsData = products.map((product) => {
      return (
        <div key={product.uuid}>
          <p>{product.category}</p>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button onClick={() => updateHandler(product)}>Update</button>
          <button onClick={() => addToCartHandler(product.id)}>
            addToCart
          </button>
        </div>
      );
    });
  }

  if (isShow) {
    productsData = data.map((data, index) => {
      return (
        <div key={index}>
          <p>{data.category}</p>
          <p>{data.title}</p>
          <p>{data.description}</p>
          <p>{data.price}</p>
        </div>
      );
    });
  }
  if (isUpdating) {
    productsData = (
      <div>
        <form>
          <div>
            <label>
              Category
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Title
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Description
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Price
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
        </form>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    );
  }

  return (
    <div>
      {productsData}
      {isShow && <button onClick={submitHandler}>submit</button>}
    </div>
  );
}

export default CreateProduct;
