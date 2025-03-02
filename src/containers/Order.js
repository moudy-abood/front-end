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

function Order() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  const { addresses } = useSelector((state) => state.addressReducer);
  const { items } = useSelector((state) => state.cartReducer);
  const { error } = useSelector((state) => state.addressReducer);
  const errors = addressErrorHandler(error);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showTempForm, setShowTempForm] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
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
      <div key={address.uuid}>
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
    }
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
    <div>
      <form onSubmit={handleTempAddressSubmit}>
        <div>
          <label>
            Country
            <input
              type="text"
              name="country"
              value={tempAddress.country}
              onChange={handleTempAddressChange}
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
              value={tempAddress.city}
              onChange={handleTempAddressChange}
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
              value={tempAddress.street}
              onChange={handleTempAddressChange}
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
              value={tempAddress.postalCode}
              onChange={handleTempAddressChange}
            />
          </label>
          <span>{errors.postalCode}</span>
        </div>
        <button onSubmit={handleTempAddressSubmit} type="submit">
          Add this address to your list of addresses
        </button>
      </form>
      <p>Total : ${totalPrice}</p>
      <button onClick={() => orderHandler(selectedAddress, totalPrice)}>
        Order using this temporary address
      </button>
      <button onClick={() => setShowTempForm(!showTempForm)}>
        {showTempForm ? "Cancel temporary address" : "Use temporary address"}
      </button>
    </div>
  );

  const contentToRender = (
    <div>
      {showTempForm ? (
        tempAddressForm
      ) : (
        <div>
          {addressList}
          <p>Total : ${totalPrice}</p>
          <button onClick={() => setShowTempForm(!showTempForm)}>
            {showTempForm
              ? "Cancel temporary address form"
              : "Add a temporary address"}
          </button>
          <button onClick={() => orderHandler(selectedAddress, totalPrice)}>
            Order now
          </button>
        </div>
      )}
    </div>
  );

  const successMessageHandler = () => {
    setIsOrderSuccess(false);
    navigate("/");
  };

  const orderSuccessMessage = (
    <div>
      <h2>Order Confirmed!</h2>
      <p>Your order has been placed successfully</p>
      <button onClick={successMessageHandler}>Okay</button>
    </div>
  );

  return <div>{isOrderSuccess ? orderSuccessMessage : contentToRender}</div>;
}

export default Order;
