import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { checkToken } from "../../utils/helpers";
import { fetchAddresses, deleteAddress } from "../../store/Actions/Address";
import Confirmation from "../../components/Confirmation";

function AddressList() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    dispatch(fetchAddresses());
  }, [dispatch, navigate, token]);

  const { addresses } = useSelector((state) => state.addressReducer);

  const [confirm, setConfirm] = useState(false)
  const [selectedUuid, setSelectedUuid] = useState('')

  const selectedUuidHandler = (uuid) =>{ 
    setSelectedUuid(uuid)
    setConfirm(true)
  }

  const deleteAddressHandler = async (uuid) => {
    const result = await dispatch(deleteAddress(uuid));
    if(result.success){
      dispatch(fetchAddresses());
      setConfirm(false)
    }
  };

  const addressList = addresses?.map((address) => {
    return (
      <div key={address.uuid}>
        <p>{address.country}</p>
        <p>{address.city}</p>
        <p>{address.street}</p>
        <p>{address.postalCode}</p>
        <Link to={`/edit-address?edit=${address.uuid}`}>edit</Link>
        <button 
        onClick={() => selectedUuidHandler(address.uuid)}
        >Remove</button>
      </div>
    );
  });

  const renderedAddress = (
    <div>
      {addressList}
      <Link to="/create-address">Add address</Link>
      {confirm? (
        <Confirmation
        message="Are you sure you want to delete this address?"
        confirm={()=> deleteAddressHandler(selectedUuid)}
        cancel={()=> setConfirm(false)}
        />
      ): null}
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
