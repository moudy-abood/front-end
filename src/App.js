import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./containers/User/User";
import Login from "./containers/User/Login";
import Address from "./containers/Address/Address";
import Profile from "./containers/User/Profile";
import Addresses from "./containers/Address/Addresses";
import CreateProducts from "./containers/Products/Products";
import Cart from "./containers/Cart";
import Order from "./containers/Order";
import Layout from "./navigation/Routes";

import Home from "./containers/Home";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myAddress" element={<Addresses />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/CreateAddress" element={<Address />} />
        <Route path="/CreateProducts" element={<CreateProducts/>} />
        <Route path="/orders" element={<Order/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
