import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authErrorHandler, checkToken } from "../../utils/helpers";
import { fetchUser, updateUserCredentials } from "../../store/Actions/User";

import "../../assets/css/profileCredentials.css";

function EditCredentials() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.profileReducer);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    reEnteredPassword: "",
  });

  const errors = authErrorHandler(error, data);

  useEffect(() => {
    if (!token) navigate("/login");
    dispatch(fetchUser());
  }, [dispatch, navigate, token]);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserCredentials(data));
    if (result.success) {
      navigate("/profile");
    }
  };

  const handleCancelClick = () => {
    navigate("/profile");
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="flex-container">
        <div className="credentials-card">
          <h2 className="credentials-title">Update Password</h2>
          <form onSubmit={handleSaveClick} className="credentials-form">
            <div className="credentials-input-group">
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={data.oldPassword}
                onChange={inputChangeHandler}
                className="credentials-input"
              />
              <span className="credentials-error">
                {errors.oldPassword.typo || errors.oldPassword.wrongPassword}
              </span>
            </div>
            <div className="credentials-input-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={data.newPassword}
                onChange={inputChangeHandler}
                className="credentials-input"
              />
              <span className="credentials-error">{errors.newPassword}</span>
            </div>
            <div className="credentials-input-group">
              <label>Re-enter New Password</label>
              <input
                type="password"
                name="reEnteredPassword"
                value={data.reEnteredPassword}
                onChange={inputChangeHandler}
                className="credentials-input"
              />
              <span className="credentials-error">
                {errors.reEnteredPassword}
              </span>
            </div>
            <button type="submit" className="save-button">
              Save
            </button>
            <button onClick={handleCancelClick} className="cancel-button">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCredentials;
