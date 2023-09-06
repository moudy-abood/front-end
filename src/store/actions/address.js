import axios from 'axios';

import * as actionTypes from './actionTypes';

export const addressStart = () => {
    return {
        type: actionTypes.ADDRESS_START
    }
}

export const addressFail = (error) => {
    return {
        type: actionTypes.ADDRESS_FAIL,
        error
    }
}

export const addressSuccess = (token) => {
    return {
        type: actionTypes.ADDRESS_SUCCESS,
        idToken: token
    }
}

export const createAddress = (data) => {
    return dispatch => {
        dispatch(addressStart())
        const addressData = {
                country: data.country,
                city: data.city,
                street: data.street,
                postalCode: data.postalCode
        }
        const url = 'http://localhost:3000/address'
            const token = localStorage.getItem('token')
            const config = {
                headers: { Authorization: `Bearer ${token}`}
            }

            axios.post(url, addressData, config)
            .then(res => {
                dispatch(addressSuccess())
            })
            .catch(err => {
                dispatch(addressFail(err.response.data.validation.body.message))
            })
    }
}
