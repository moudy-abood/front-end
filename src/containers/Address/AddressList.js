import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchAddresses, deleteAddress } from "../../store/Actions/Address";
import { updateAddress } from "../../store/Actions/Address";
import Confirmation from "../../components/Confirmation";
import { addressErrorHandler, checkToken } from "../../utils/helpers";

import "../../assets/css/addressList.css";
import noAddressFound from "../../assets/images/no-address.webp";

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

  const handleNavigation = () => {
    navigate("/create-address")
  }

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

  const addressList = (
    <div className={`address-grid ${addresses.length % 2 === 1 ? "odd" : "even"}`}>
      <div className="add-address" onClick={handleNavigation}>
        <span className="plus-span">+</span>
        <Link to="/create-address">Add Address</Link>
      </div>
      {addresses?.map((address) => {
        return (
          <div className="address-card" key={address.uuid}>
            <p>{address.country}</p>
            <p>{address.city}</p>
            <p>{address.street}</p>
            <p>{address.postalCode}</p>
            <button
              className="edit-address-btn"
              onClick={() => editAddressHandler(address.uuid)}
            >
              Edit
            </button>
            <button
              className="remove-address-btn"
              onClick={() => selectedUuidHandler(address.uuid)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );

  const addressForm = (
    <div className="flex-container">
      <div className="edit-address-card">
        <h2 className="edit-address-title">Edit Address</h2>
        <form className="edit-address-form" onSubmit={handleSaveClick}>
          <div className="edit-address-input-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={data?.country}
              onChange={inputChangeHandler}
              className="edit-address-input"
            />
            <span className="edit-address-error">{errors.country}</span>
          </div>
          <div className="edit-address-input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={data?.city}
              onChange={inputChangeHandler}
              className="edit-address-input"
            />
            <span className="edit-address-error">{errors.city}</span>
          </div>
          <div className="edit-address-input-group">
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={data?.street}
              onChange={inputChangeHandler}
              className="edit-address-input"
            />
            <span className="edit-address-error">{errors.street}</span>
          </div>
          <div className="edit-address-input-group">
            <label>postalCode</label>
            <input
              type="text"
              name="postalCode"
              value={data?.postalCode}
              onChange={inputChangeHandler}
              className="edit-address-input"
            />
            <span className="edit-address-error">{errors.postalCode}</span>
          </div>
          <button className="save-button" type="submit">
            Save
          </button>
          <button type="button" onClick={cancelHandler} className="cancel-button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );

  const renderedAddress = (
    <div>
      {showEditAddress ? (
        <div>
          {addressForm}
        </div>
      ) : (
        <div>
          {addressList}
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
    <div className="flex-no-address">
      <img className="no-address-photo" src={noAddressFound} alt="no-address"/>
      <p> You don't have any address! </p>
      <Link to="/create-address">Add Address</Link>
    </div>
    </div>
  );

  const contentToRender = addresses?.length ? renderedAddress : noAddresses;

  return contentToRender;
}

export default AddressList;
