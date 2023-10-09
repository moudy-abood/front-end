import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/actions/user/updateUser";
import { fetchProfile } from "../../store/actions/user/profile";
import { deleteUser } from "../../store/actions/user/deleteUser";

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  const { name, phoneNumber, email, uuid } = useSelector(
    (state) => state.profileReducer
  );
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState({
    email,
    password: "",
    name,
    phoneNumber,
  });

  const handleUpdateClick = () => {
    setIsUpdating(true);
    setData({
      email,
      password: "",
      name,
      phoneNumber,
    });
  };
  const handleSaveClick = () => {
    setIsUpdating(false);
    dispatch(updateUser(data));
  };

  const handleDeleteClick = (uuid) => {
    setIsUpdating(false);
    dispatch(deleteUser(uuid));
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  let profile = (
    <div>
      <p>{name}</p>
      <p>{phoneNumber}</p>
      <p>{email}</p>
      <button onClick={handleUpdateClick}>Update</button>
      <button onClick={() => handleDeleteClick(uuid)}>Delete</button>
    </div>
  );
  if (isUpdating) {
    profile = (
      <div>
        <form>
          <div>
            <label>
              Email
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Phone Number
              <input
                type="text"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
        </form>
        <button onClick={handleSaveClick}>Save</button>
      </div>
    );
  }
  return <div>{profile}</div>;
}
export default Profile;
