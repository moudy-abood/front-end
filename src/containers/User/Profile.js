import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchUser, updateUser } from "../../store/Actions/User";
import { checkToken, authErrorHandler } from "../../utils/helpers";

function Profile() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  const { name, phoneNumber, email, error } = useSelector(
    (state) => state.profileReducer
  );
  const errors = authErrorHandler(error);

  useEffect(() => {
    if (!token) navigate("/login");
    dispatch(fetchUser());
  }, [dispatch, navigate, token]);

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setData({
      name,
      phoneNumber,
    });
  };
  const handleSaveClick = (e) => {
    e.preventDefault();
    const result = dispatch(updateUser(data));
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const profile = (
    <div>
      <div>
        <p>{name}</p>
        <p>{phoneNumber}</p>
        <p>{email}</p>
        <button onClick={handleEditClick}>Edit profile</button>
      </div>
      <div>
        <Link to="/address">Manage addresses</Link>
      </div>
    </div>
  );

  const editProfile = (
    <div>
      <form onSubmit={handleSaveClick}>
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
          <span>{errors.name}</span>
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
          <span>{errors.phoneNumber}</span>
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={handleCancelClick}>Cancel</button>
      <div>
        <Link to="/profile-credentials">change email or password</Link>
      </div>
    </div>
  );
  const contentToRender = isEditing ? editProfile : profile;
  return contentToRender;
}
export default Profile;
