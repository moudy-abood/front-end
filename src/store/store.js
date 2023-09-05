import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

import authReducer from './reducer/auth';

export const store = configureStore({
    reducer:{
        authReducer
    },
    middleware: [thunk]
});
