import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./containers/User/SignUp";
import Login from "./containers/User/Login";
import Address from "./containers/Address/Address";
import Profile from "./containers/User/Profile";
import Addresses from "./containers/Address/AddressList";
import CreateProduct from "./containers/Products/Product";
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
        <Route path="/myAddress" element={<Addresses/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/CreateAddress" element={<Address/>} />
        <Route path="/CreateProducts" element={<CreateProduct/>} />
        <Route path="/orders" element={<Order/>} />
        <Route path="/categories" element={<Category/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
