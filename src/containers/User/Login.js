import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../store/Actions/Auth";
import { authErrorHandler, checkToken } from "../../utils/helpers";

function Login() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const token = checkToken();

  useEffect(() => {
    if (!token) navigate("/login");
  },[token, navigate])

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
      navigate("/");
    }
  };

  const loginForm = (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.loginEmail}</span>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.loginPassword}</span>
        </div>
        <span>{errors.failedLogin}</span>
        <button onSubmit={submitHandler} type="submit">
          Login
        </button>
      </form>
      <div>
        <Link to="/sign-up">Create new account</Link>
      </div>
    </div>
  );


  return loginForm;
}

export default Login;
