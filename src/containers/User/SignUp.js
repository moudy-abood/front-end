import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "../../store/Actions/Auth";
import { createCart } from "../../store/Actions/Cart";
import { authErrorHandler, checkToken } from "../../utils/helpers";

import "../../assets/css/signUp.css";

function User() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    reEnteredPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const { error } = useSelector((state) => state.authReducer);

  const errors = authErrorHandler(error, data);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(signUp(data));
    if (result.success) {
      await dispatch(createCart());
      navigate("/");
    }
  };

  const signUpForm = (
    <div>
      <div className="flex-container">
        <div className="signup-card">
          <h2 className="signup-title">Sign Up</h2>
          <form className="signup-form" onSubmit={submitHandler}>
            <div className="signup-input-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={inputChangeHandler}
                className="signup-input"
              />
              <span className="credentials-error">
                {errors.email.typo || errors.email.alreadyUsed}
              </span>
            </div>
            <div className="signup-input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="First and last name"
                value={data.name}
                onChange={inputChangeHandler}
                className="signup-input"
              />
              <span className="credentials-error">{errors.name}</span>
            </div>
            <div className="signup-input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={inputChangeHandler}
                className="signup-input"
              />
              <span className="credentials-error">{errors.password}</span>
            </div>
            <div className="signup-input-group">
              <label>Re-enter password</label>
              <input
                type="password"
                name="reEnteredPassword"
                value={data.reEnteredPassword}
                onChange={inputChangeHandler}
                className="signup-input"
              />
              <span className="credentials-error">
                {errors.reEnteredPassword}
              </span>
            </div>
            <div className="signup-input-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="(123) 456-7890"
                value={data.phoneNumber}
                onChange={inputChangeHandler}
                className="signup-input"
              />
              <span className="credentials-error">{errors.phoneNumber}</span>
            </div>
            <button className="signup-button" type="submit">
              Sign Up
            </button>
            <div>
              <p className="existing-customer">Already a customer?</p>
              <Link className="login-link" to="/login">
                Login instead
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return <div>{signUpForm}</div>;
}

export default User;
