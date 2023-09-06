import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (data) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: data.email,
            password: data.password,
            name: data.name,
            phoneNumber: data.phoneNumber,
            role: "ADMIN"
            
        }
        const url = 'http://localhost:3000/user'
        axios.post(url, authData)
        .then(res => {
            localStorage.setItem('token',res.data.token)
            dispatch(authSuccess(res.data.idToken));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.validation.body.message))
        })
        
    }
}

export const logout = () => {
        localStorage.removeItem('token');
        return {
            type: actionTypes.AUTH_LOGOUT
        }
    }