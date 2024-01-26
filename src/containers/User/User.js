import { useDispatch } from "react-redux";
import React, { useState } from "react";

import { signUp, logout } from "../../store/Actions/User/Auth";
import { createCart } from "../../store/Actions/Cart";

function User() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(signUp(data));
    dispatch(createCart());
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
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
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
              value={data.phoneNumber}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <button onSubmit={submitHandler} type="submit">
          Submit
        </button>
      </form>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
}

export default User;
