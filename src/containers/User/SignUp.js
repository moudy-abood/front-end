import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "../../store/Actions/Auth";
import { createCart } from "../../store/Actions/Cart";
import { authErrorHandler, checkToken } from "../../utils/helpers";

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
          <span>{errors.email.typo || errors.email.alreadyUsed}</span>
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
          <span>{errors.password}</span>
        </div>
        <div>
          <label>
            Re-enter password
            <input
              type="password"
              name="reEnteredPassword"
              value={data.reEnteredPassword}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.reEnteredPassword}</span>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="First and last name"
              value={data.name}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.name}</span>
        </div>
        <div>
          <label>
            Phone Number
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              value={data.phoneNumber}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.phoneNumber}</span>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <p>already a customer?</p>
        <Link to="/login">Login instead</Link>
      </div>
    </div>
  );

  return signUpForm;
}

export default User;
