import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAddress } from "../../store/Actions/Address";
import { checkToken } from "../../utils/helpers";
import { addressErrorHandler } from "../../utils/helpers";

import "../../assets/css/createAddress.css";

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
      <div className="flex-container">
        <div className="create-address-card">
          <h2 className="create-address-title">Create Address</h2>
          <form className="create-address-form" onSubmit={submitHandler}>
            <div className="create-address-input-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={data.country}
                onChange={inputChangeHandler}
                className="create-address-input"
              />
              <span className="create-address-error">{errors.country}</span>
            </div>
            <div className="create-address-input-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={inputChangeHandler}
                className="create-address-input"
              />
              <span className="create-address-error">{errors.city}</span>
            </div>
            <div className="create-address-input-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={data.street}
                onChange={inputChangeHandler}
                className="create-address-input"
              />
              <span className="create-address-error">{errors.street}</span>
            </div>
            <div className="create-address-input-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={data.postalCode}
                onChange={inputChangeHandler}
                className="create-address-input"
              />
              <span className="create-address-error">{errors.postalCode}</span>
            </div>
            <button className="save-button" type="submit">
              Add
            </button>
            <button
              className="cancel-button"
              onClick={cancelHandler}
              type="button"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAddress;
