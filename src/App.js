import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./containers/User/User";
import Address from "./containers/Address/Address";
import Profile from "./containers/User/Profile";
import Addresses from "./containers/Address/Addresses";
import CreateProducts from "./containers/Products/Products";
import Cart from "./containers/Cart";
import Layout from "./navigation/Routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/myAddress" element={<Addresses />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/CreateAddress" element={<Address />} />
        <Route path="/CreateProducts" element={<CreateProducts/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
