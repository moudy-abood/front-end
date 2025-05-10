import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../store/Actions/Auth";
import { createCart } from "../../store/Actions/Cart";
import { authErrorHandler, checkToken } from "../../utils/helpers";

import "../../assets/css/login.css";

function Login() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const token = checkToken();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const { error, failedLogin } = useSelector((state) => state.authReducer);

  const errors = authErrorHandler(error, failedLogin);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(data));
    if (result.success) {
      await dispatch(createCart());
      navigate("/");
    }
  };

  const loginForm = (
    <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <h2 className="login-header">Login</h2>
        <div className="login-input-container">
          <label className="login-label">
            Email
            <input
              className="login-input"
              type="text"
              name="email"
              value={data.email}
              onChange={inputChangeHandler}
            />
          </label>
          <span className="login-error">{errors.loginEmail}</span>
        </div>
        <div className="login-input-container">
          <label className="login-label">
            Password
            <input
              className="login-input"
              type="password"
              name="password"
              value={data.password}
              onChange={inputChangeHandler}
            />
          </label>
          <span className="login-error">{errors.loginPassword}</span>
        </div>
        <span className="login-error">{errors.failedLogin}</span>
        <button className="login-button" onSubmit={submitHandler} type="submit">
          Login
        </button>
      </form>
      <div className="login-signup-link">
        <Link className="login-link" to="/sign-up">
          Create new account
        </Link>
      </div>
    </div>
  );

  return <div>{loginForm}</div>;
}

export default Login;
