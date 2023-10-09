import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../../store/actions/address/fetchAddress";
import { updateAddress } from "../../store/actions/address/updateAddress";
import { deleteAddress } from "../../store/actions/address/deleteAddress";

function Addresses() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const { addresses } = useSelector((state) => state.fetchAddressReducer);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState(
    addresses.map((address) => {
      return {
        country: address.country,
        city: address.city,
        street: address.street,
        postalCode: address.postalCode,
      };
    })
  );
  const handleSaveClick = () => {
    setIsUpdating(false);
    dispatch(updateAddress(data));
  };

  const handleUpdateClick = (address) => {
    setIsUpdating(true);
    setData({
      uuid: address.uuid,
      country: address.country,
      city: address.city,
      street: address.street,
      postalCode: address.postalCode,
    });
  };

  const handleDeleteClick = (address) => {
    dispatch(deleteAddress(address.uuid))
  }

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  let addressData = addresses.map((address) => {
    return (
      <div key={address.uuid}>
        <p>{address.country}</p>
        <p>{address.city}</p>
        <p>{address.street}</p>
        <p>{address.postalCode}</p>
        <button onClick={() => handleUpdateClick(address)}>Update</button>
        <button onClick={() => handleDeleteClick(address)}>Delete</button>
      </div>
    );
  });

  if (isUpdating) {
    addressData = (
      <div>
        <form>
          <div>
            <label>
              Country
              <input type="text" name="country" onChange={inputChangeHandler} />
            </label>
          </div>
          <div>
            <label>
              City
              <input type="text" name="city" onChange={inputChangeHandler} />
            </label>
          </div>
          <div>
            <label>
              Street
              <input type="text" name="street" onChange={inputChangeHandler} />
            </label>
          </div>
          <div>
            <label>
              postalCode
              <input
                type="text"
                name="postalCode"
                onChange={inputChangeHandler}
              />
            </label>
          </div>
        </form>
        <button onClick={handleSaveClick}>Save</button>
      </div>
    );
  }

  return <div>{addressData}</div>;
}

export default Addresses;
