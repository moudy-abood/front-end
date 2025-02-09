import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import { fetchAddress } from "../../store/Actions/Address";
import { updateAddress } from "../../store/Actions/Address";
import { addressErrorHandler } from "../../utils/helpers";

function EditAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const addressUuid = searchParams.get("edit");
  const { error, address } = useSelector((state) => state.addressReducer);
  const errors = addressErrorHandler(error);

  const [data, setData] = useState({
    country: "",
    city: "",
    street: "",
    postalCode: "",
  });

  useEffect(() => {
    dispatch(fetchAddress(addressUuid));
  }, [dispatch, addressUuid]);

  useEffect(() => {
    if (address) {
      setData((prevData) => ({
        ...prevData,
        country: address?.country || "",
        city: address?.city || "",
        street: address?.street || "",
        postalCode: address?.postalCode || "",
      }));
    }
  }, [address]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateAddress(data, addressUuid));
    if (result.success) {
      navigate("/address");
    }
  };

  const cancelHandler = () => {
    navigate("/address");
  };

  const addressForm = (
    <div>
      <form onSubmit={handleSaveClick}>
        <div>
          <label>
            Country
            <input
              type="text"
              name="country"
              value={data?.country}
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
              value={data?.city}
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
              value={data?.street}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.street}</span>
        </div>
        <div>
          <label>
            postalCode
            <input
              type="text"
              name="postalCode"
              value={data?.postalCode}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.postalCode}</span>
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={cancelHandler}>Cancel</button>
    </div>
  );

  return addressForm;
}

export default EditAddress;
