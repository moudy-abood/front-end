import * as actionTypes from './actionTypes';
import axios from 'axios';

export const profileFetchStart = () => {
    return {
        type: actionTypes.PROFILE_FETCH_START
    }
}

export const profileFetchFail = (error) => {
    return {
        type: actionTypes.PROFILE_FETCH_FAIL,
        error
    }
}

export const profileFetchSuccess = (payload) => {
    return {
        type: actionTypes.PROFILE_FETCH_SUCCESS,
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        loading: false,
        error: null
    }
}

export const fetchProfile = (data) => {
    return dispatch => {
        const url = 'http://localhost:3000/user/profile'
    
        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.get(url,config)
        .then(res => {
            dispatch(profileFetchSuccess(res.data))
    
        }).catch(err => {
            dispatch(profileFetchFail(err))
        })
    }
}