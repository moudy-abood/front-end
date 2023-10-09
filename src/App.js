import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./containers/User/User";
import Address from "./containers/Address/Address";
import Profile from "./containers/User/Profile";
import Addresses from "./containers/Address/Addresses";
import Layout from "./components/Layout/Layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/myAddress" element={<Addresses />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/CreateAddress" element={<Address />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
