import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./containers/User/SignUp";
import Login from "./containers/User/Login";
import EditCredentials from "./containers/User/EditCredentials";
import CreateAddress from "./containers/Address/CreateAddress";
import Profile from "./containers/User/Profile";
import Addresses from "./containers/Address/AddressList";
import CreateProduct from "./containers/Products/CreateProduct";
import Product from "./containers/Products/Product";
import Cart from "./containers/Cart";
import Order from "./containers/Order";
import Category from "./containers/Products/Category";
import Layout from "./navigation/Routes";

import Home from "./containers/Home";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:uuid" element={<Product/>} />
        <Route path="/address" element={<Addresses/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile-credentials" element={<EditCredentials/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/create-address" element={<CreateAddress/>} />
        <Route path="/create-product" element={<CreateProduct/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/categories" element={<Category/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
