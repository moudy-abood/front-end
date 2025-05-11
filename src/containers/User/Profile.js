import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchUser, updateUser } from "../../store/Actions/User";
import { signOut } from "../../store/Actions/Auth";
import { checkToken, authErrorHandler } from "../../utils/helpers";

import "../../assets/css/profile.css";
import profilePhoto from "../../assets/images/profile-photo.jpg";

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
    email: "",
    name: "",
    phoneNumber: "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setData({
      email,
      name,
      phoneNumber,
    });
  };
  const handleSaveClick = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUser(data));
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

  const signOutHandler = () => {
    dispatch(signOut());
    navigate("/");
  };

  const profile = (
    <div className="flex-container">
      <div className="profile-card">
        <div className="photo-wrapper">
          <img src={profilePhoto} alt="profile" className="profile-photo" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <h3 className="profile-h3">E-mail</h3>
          <p className="profile-email">{email}</p>
          <h3 className="profile-h3">Phone Number</h3>
          <p className="profile-phone-number">{phoneNumber}</p>
          <button className="edit-profile" onClick={handleEditClick}>
            Edit profile
          </button>
          <button className="sign-out" onClick={signOutHandler}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  const editProfile = (
    <div className="flex-container">
      <div className="profile-edit-card">
        <form className="profile-info" onSubmit={handleSaveClick}>
          <h3 className="profile-edit">Edit Profile</h3>
          <div className="input-group">
            <label className="input-label">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={inputChangeHandler}
              className="input-field"
            />
            <span className="error-message">{errors.name}</span>
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={inputChangeHandler}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={inputChangeHandler}
              className="input-field"
            />
            <span className="error-message">{errors.phoneNumber}</span>
          </div>
          <button type="submit" className="edit-profile">
            Save
          </button>
          <button className="sign-out" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/profile-credentials" className="reset-password-link">
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
  const contentToRender = isEditing ? editProfile : profile;
  return <div>{contentToRender}</div>;
}
export default Profile;
