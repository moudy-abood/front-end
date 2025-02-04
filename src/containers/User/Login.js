import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../store/Actions/User/Auth";
import AlreadyLoggedIn from "../../components/AlreadyLoggedIn";
import { errorHandler, checkToken } from "../../utils/helpers";

function Login() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { error, failedLogin } = useSelector((state) => state.authReducer);

  const errors = errorHandler(error, failedLogin);
  const navigate = useNavigate();
  const isLoggedIn = checkToken();

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
      <span>{}</span>
    </div>
  );

  const contentToRender = isLoggedIn ? AlreadyLoggedIn : loginForm;

  return contentToRender;
}

export default Login;
