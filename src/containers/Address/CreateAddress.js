import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAddress } from "../../store/Actions/Address";
import { checkToken } from "../../utils/helpers";
import { addressErrorHandler } from "../../utils/helpers";

function CreateAddress() {
  const { error } = useSelector((state) => state.addressReducer);
  const errors = addressErrorHandler(error);

  const [data, setData] = useState({
    country: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(createAddress(data));
    if (result.success) {
      navigate("/address");
    }
  };

  const cancelHandler = () => {
    navigate("/address");
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
          <span>{errors.country}</span>
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
          <span>{errors.city}</span>
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
          <span>{errors.street}</span>
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
          <span>{errors.postalCode}</span>
        </div>
        <button onSubmit={submitHandler} type="submit">
          Add
        </button>
      </form>
      <button onClick={cancelHandler}>Cancel</button>
    </div>
  );
}

export default CreateAddress;
