import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer from "./reducer/user/auth";
import addressReducer from "./reducer/address/address";
import profileReducer from "./reducer/user/profile";
import updateUserReducer from "./reducer/user/updateUser";

export const store = configureStore({
  reducer: {
    authReducer,
    addressReducer,
    profileReducer,
    updateUserReducer,
  },
  middleware: [thunk],
});
