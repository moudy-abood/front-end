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
import MyOrders from "./containers/MyOrders";
import Category from "./containers/Products/Category";
import Home from "./containers/Home";
import SingleOrder from "./containers/SingleOrder";
import Header from "./containers/Header/FullHeader";
import Footer from "./containers/Footer";

import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:uuid" element={<Product />} />
            <Route path="/address" element={<Addresses />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-credentials" element={<EditCredentials />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/create-address" element={<CreateAddress />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/my-order/:uuid" element={<SingleOrder />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
