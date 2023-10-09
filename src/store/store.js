import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer from "./reducer/user/auth";
import addressReducer from "./reducer/address/address";
import profileReducer from "./reducer/user/profile";
import updateUserReducer from "./reducer/user/updateUser";
import updateAddressReducer from "./reducer/address/updateAddress";
import fetchAddressReducer from "./reducer/address/fetchAddress";

export const store = configureStore({
  reducer: {
    authReducer,
    profileReducer,
    updateUserReducer,
    addressReducer,
    fetchAddressReducer,
    updateAddressReducer,
  },
  middleware: [thunk],
});
