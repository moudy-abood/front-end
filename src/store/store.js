import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

import authReducer from './reducer/auth';
import addressReducer from './reducer/address';
import profileReducer from './reducer/profile';

export const store = configureStore({
    reducer:{
        authReducer,
        addressReducer,
        profileReducer
    },
    middleware: [thunk]
});
