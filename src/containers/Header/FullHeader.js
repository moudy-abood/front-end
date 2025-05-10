import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/home.css";
import cartIcon from "../../assets/images/cart.svg";
import logoIcon from "../../assets/images/logo.png";

import SearchBar from "../Header/SearchBar";
import { checkToken } from "../../utils/helpers";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(checkToken());
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const loginStatus = isLoggedIn ? (
    <div className="profile-cart">
      <div className="my-addresses">
        <Link to="/address">My Addresses</Link>
      </div>
      <div className="my-orders">
        <Link to="/orders">My Orders</Link>
      </div>
      <div className="profile">
        <Link to="/profile">Profile</Link>
      </div>
      <div className="cart">
        <Link to="/cart">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
        </Link>
      </div>
    </div>
  ) : (
    <div className="profile-cart">
      <Link to="/sign-up" className="sign-up">
        Sign Up
      </Link>
      <Link to="/login" className="login">
        Login
      </Link>
    </div>
  );

  const home = (
    <div>
      <Link to="/">
        <img src={logoIcon} alt="logo" className="logo-icon-1" />
      </Link>
    </div>
  );

  return (
    <div>
      <div className="header-flex">
        <div className="left-section">{home}</div>
        <div className="center-section">
          <div className="search-wrapper">
            <SearchBar />
          </div>
        </div>
        <div className="right-section">{loginStatus}</div>
      </div>
    </div>
  );
}

export default Header;
