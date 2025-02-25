import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchAddresses, deleteAddress } from "../../store/Actions/Address";
import { updateAddress } from "../../store/Actions/Address";
import Confirmation from "../../components/Confirmation";
import { addressErrorHandler, checkToken } from "../../utils/helpers";

function AddressList() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    dispatch(fetchAddresses());
  }, [dispatch, navigate, token]);

  const { addresses } = useSelector((state) => state.addressReducer);
  const { error } = useSelector((state) => state.addressReducer);
  const errors = addressErrorHandler(error);

  const [data, setData] = useState({
    country: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const [confirm, setConfirm] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [selectedUuid, setSelectedUuid] = useState("");

  const selectedUuidHandler = (uuid) => {
    setSelectedUuid(uuid);
    setConfirm(true);
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const cancelHandler = () => {
    setShowEditAddress(false);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateAddress(data, selectedUuid));
    if (result.success) {
      setShowEditAddress(false);
      dispatch(fetchAddresses());
    }
  };

  const editAddressHandler = async (uuid) => {
    setShowEditAddress(true);
    setSelectedUuid(uuid);
    const selectedAddress = addresses?.find((address) => address.uuid === uuid);
    if (selectedAddress) {
      setData(selectedAddress);
    }
  };

  const deleteAddressHandler = async (uuid) => {
    const result = await dispatch(deleteAddress(uuid));
    if (result.success) {
      dispatch(fetchAddresses());
      setConfirm(false);
    }
  };

  const addressList = addresses?.map((address) => {
    return (
      <div key={address.uuid}>
        <p>{address.country}</p>
        <p>{address.city}</p>
        <p>{address.street}</p>
        <p>{address.postalCode}</p>
        <button onClick={() => editAddressHandler(address.uuid)}>edit</button>
        <button onClick={() => selectedUuidHandler(address.uuid)}>
          Remove
        </button>
      </div>
    );
  });

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

  const renderedAddress = (
    <div>
      {showEditAddress ? (
        addressForm
      ) : (
        <div>
          {addressList}
          <Link to="/create-address">Add address</Link>
        </div>
      )}

      {confirm ? (
        <Confirmation
          message="Are you sure you want to delete this address?"
          confirm={() => deleteAddressHandler(selectedUuid)}
          cancel={() => setConfirm(false)}
        />
      ) : null}
    </div>
  );

  const noAddresses = (
    <div>
      <p> you don't have any addresses yet </p>
      <Link to="/create-address">Add address</Link>
    </div>
  );

  const contentToRender = addresses?.length ? renderedAddress : noAddresses;

  return contentToRender;
}

export default AddressList;
