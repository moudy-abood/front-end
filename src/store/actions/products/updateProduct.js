import axios from "axios";

import * as actionTypes from "../actionTypes/products";

export const updateProductStart = () => {
    return {
        type: actionTypes.UPDATE_PRODUCT_START
    }
}

export const updateProductFail = (error) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_FAIL,
        error
    }
}

export const updateProductSuccess = (payload) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        payload
    }
}

export const updateProduct = (data) => {
    return async (dispatch) =>{
        dispatch(updateProductStart())
        try {
            const token = localStorage.getItem("token");
            const configs = axios.create({
              baseURL: "http://localhost:3000",
              headers: { Authorization: `Bearer ${token}` },
            });
            const response = await configs.put(`/product/${data.uuid}`,{
                category: data.category,
                title: data.title,
                description: data.description,
                price: data.price
            })
            dispatch(updateProductSuccess(response))
        } catch (error) {
            dispatch(updateProductFail(error.message))
        }
    }
}