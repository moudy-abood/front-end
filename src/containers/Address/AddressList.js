import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { checkToken } from "../../utils/helpers";
import { fetchAddresses } from "../../store/Actions/Address";

function AddressList() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    dispatch(fetchAddresses());
  }, [dispatch, navigate, token]);

  const { addresses } = useSelector((state) => state.addressReducer);

  const addressList = addresses?.map((address) => {
    return (
      <div key={address.uuid}>
        <p>{address.country}</p>
        <p>{address.city}</p>
        <p>{address.street}</p>
        <p>{address.postalCode}</p>
        <Link to={`/edit-address?edit=${address.uuid}`}>edit</Link>
      </div>
    );
  });

  const renderedAddress = (
    <div>
      {addressList}
      <Link to="/create-address">Add address</Link>
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
