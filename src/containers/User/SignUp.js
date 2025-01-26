import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "../../store/Actions/User/Auth";
import { createCart } from "../../store/Actions/Cart";

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

  //todo: display validations errors
  // const { error } = useSelector(state => state.authReducer)
  // console.log(error);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (data.password === data.reEnteredPassword) {
      dispatch(signUp(data));
      dispatch(createCart());
      navigate("/");
    } else {
      console.log("Password does not match");
    }
  };

  return (
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
          <label>
            Re-enter password
            <input
              type="password"
              name="reEnteredPassword"
              value={data.reEnteredPassword}
              onChange={inputChangeHandler}
            />
          </label>
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
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <p>already a customer?</p>
        <Link to="/login">Login instead</Link>
      </div>
    </div>
  );
}

export default User;
