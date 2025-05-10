import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { fetchAddresses } from "../store/Actions/Address";
import { fetchCart } from "../store/Actions/Cart";
import { checkToken, addressErrorHandler } from "../utils/helpers";
import { createOrder } from "../store/Actions/Order";
import { createCart } from "../store/Actions/Cart";
import { createAddress } from "../store/Actions/Address";

import "../assets/css/order.css";

//remove setselceted when opening the temp address

function Order() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  const { addresses } = useSelector((state) => state.addressReducer);
  const { items } = useSelector((state) => state.cartReducer);
  const { error } = useSelector((state) => state.orderReducer);
  const errors = addressErrorHandler(error);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showTempForm, setShowTempForm] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [noAddress, setNoAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState({
    country: "",
    city: "",
    street: "",
    postalCode: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(fetchAddresses());
    dispatch(fetchCart());
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [navigate, items]);

  const handleAddressSelect = (uuid) => {
    setSelectedAddress((prev) => (prev === uuid ? null : uuid));
  };

  const handleTempAddressChange = (e) => {
    setTempAddress({ ...tempAddress, [e.target.name]: e.target.value });
    setSelectedAddress(tempAddress);
  };

  const totalPrice = items
    ?.map((item) => {
      return item.Product.price * item.quantity;
    })
    .reduce((acc, curr) => acc + curr, 0);

  const addressList = addresses?.map((address) => {
    return (
      <div key={address.uuid} className="pick-address-card">
        <label>
          <input
            type="checkbox"
            checked={selectedAddress === address.uuid}
            onChange={() => handleAddressSelect(address.uuid)}
          />
          <p>{address.country}</p>
          <p>{address.city}</p>
          <p>{address.street}</p>
          <p>{address.postalCode}</p>
        </label>
      </div>
    );
  });

  const orderHandler = async (selectedAddress, totalPrice) => {
    const result = await dispatch(
      createOrder({
        ...(typeof selectedAddress === "string"
          ? { addressUuid: selectedAddress }
          : { temporaryAddress: selectedAddress }),
        total: totalPrice,
      })
    );
    if (result.success) {
      await dispatch(createCart());
      setIsOrderSuccess(true);
    } else {
      setNoAddress(true);
    }
  };

  const noAddressConfirmation = () => {
    setNoAddress(false);
  };

  const handleTempAddressSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createAddress(tempAddress));
    if (result.success) {
      setShowTempForm(false);
      await dispatch(fetchAddresses());
    }
  };

  const tempAddressForm = (
    <div className="flex-container">
      <div className="create-temp-address-card">
        <h2 className="create-temp-address-title">Temporary Address</h2>
        <form
          className="create-temp-address-form"
          onSubmit={handleTempAddressSubmit}
        >
          <div className="create-temp-address-input-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={tempAddress.country}
              onChange={handleTempAddressChange}
              className="create-temp-address-input"
            />
            <span className="create-temp-address-error">{errors.country}</span>
          </div>
          <div className="create-temp-address-input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={tempAddress.city}
              onChange={handleTempAddressChange}
              className="create-temp-address-input"
            />
            <span className="create-temp-address-error">{errors.city}</span>
          </div>
          <div className="create-temp-address-input-group">
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={tempAddress.street}
              onChange={handleTempAddressChange}
              className="create-temp-address-input"
            />
            <span className="create-temp-address-error">{errors.street}</span>
          </div>
          <div className="create-temp-address-input-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={tempAddress.postalCode}
              onChange={handleTempAddressChange}
              className="create-temp-address-input"
            />
            <span className="create-temp-address-error">
              {errors.postalCode}
            </span>
          </div>
          <p className="total-price-tag">Total : ${totalPrice}</p>
          <button
            className="temp-address-btn"
            onClick={handleTempAddressSubmit}
            type="button"
          >
            Add this address to your list of addresses
          </button>
          <button
            className="save-button"
            type="button"
            onClick={() => orderHandler(selectedAddress, totalPrice)}
          >
            Order using this temporary address
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => setShowTempForm(!showTempForm)}
          >
            {showTempForm
              ? "Cancel temporary address"
              : "Use temporary address"}
          </button>
        </form>
      </div>
    </div>
  );

  const noAddressSelected = (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <p className="confirmation-message">Please choose an Address !</p>
        <button className="confirmation-btn" onClick={noAddressConfirmation}>
          Okay
        </button>
      </div>
    </div>
  );

  const contentToRender = (
    <div>
      <div>
        {showTempForm ? (
          tempAddressForm
        ) : (
          <div>
            {noAddress ? (
              noAddressSelected
            ) : (
              <div className="proceed-order-flex">
                <div className="proceed-order-grid">{addressList}</div>
                <div className="flex-temp-total">
                  <span>Total : ${totalPrice}</span>
                  <button
                    className="order-now-btn"
                    onClick={() => orderHandler(selectedAddress, totalPrice)}
                  >
                    Order now
                  </button>
                  <button
                    className="temp-address-btn"
                    onClick={() => setShowTempForm(!showTempForm)}
                  >
                    {showTempForm
                      ? "Cancel temporary address form"
                      : "Use a temporary address"}
                  </button>
                  <p>
                    <span>PLACE</span>
                    <span>YOUR</span>
                    <span>ADS</span> <span>HERE</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const successMessageHandler = () => {
    setIsOrderSuccess(false);
    navigate("/");
  };

  const orderSuccessMessage = (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <h3 className="confirmation-message">Order Confirmed!</h3>
        <p className="confirmation-message">
          Your order has been placed successfully
        </p>
        <button className="confirmation-btn" onClick={successMessageHandler}>
          Okay
        </button>
      </div>
    </div>
  );

  return <div>{isOrderSuccess ? orderSuccessMessage : contentToRender}</div>;
}

export default Order;
