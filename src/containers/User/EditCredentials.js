import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { authErrorHandler, checkToken } from "../../utils/helpers";
import { fetchUser, updateUserCredentials } from "../../store/Actions/User";

function EditCredentials() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();
  const { error, email } = useSelector((state) => state.profileReducer);

  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    reEnteredPassword: "",
  });

  const errors = authErrorHandler(error, data);

  useEffect(() => {
    if (!token) navigate("/login");
    dispatch(fetchUser());
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (email) {
      setData((prevData) => ({
        ...prevData,
        email,
      }));
    }
  }, [email]);

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
      <form onSubmit={handleSaveClick}>
        <div>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={data?.email}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.email.typo || errors.email.alreadyUsed}</span>
        </div>
        <div>
          <label>
            Old password
            <input
              type="password"
              name="oldPassword"
              value={data?.oldPassword}
              onChange={inputChangeHandler}
            />
          </label>
          <span>
            {errors.oldPassword.typo || errors.oldPassword.wrongPassword}
          </span>
        </div>
        <div>
          <label>
            New password
            <input
              type="password"
              name="newPassword"
              value={data?.newPassword}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.newPassword}</span>
        </div>
        <div>
          <label>
            Re-enter password
            <input
              type="password"
              name="reEnteredPassword"
              value={data?.reEnteredPassword}
              onChange={inputChangeHandler}
            />
          </label>
          <span>{errors.reEnteredPassword}</span>
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={handleCancelClick}>Cancel</button>
      <div>
        <Link to="/profile-credentials">change email or password</Link>
      </div>
    </div>
  );
}

export default EditCredentials;
