import { useDispatch } from "react-redux";
import { createAddress } from "../store/actions/address/address";
import React, { useState } from "react";

function Address() {
  const [data, setData] = useState({
    country: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createAddress(data));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            Country
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            City
            <input
              type="text"
              name="city"
              value={data.city}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            Street
            <input
              type="text"
              name="street"
              value={data.street}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            Postal Code
            <input
              type="text"
              name="postalCode"
              value={data.postalCode}
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <button onSubmit={submitHandler} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Address;
