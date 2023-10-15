import * as actionTypes from "../../actions/actionTypes/products";

const initialState = {
    products: [],
    loading: false,
    error: null
}

const createProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PRODUCTS_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.CREATE_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.CREATE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export default createProductsReducer;
