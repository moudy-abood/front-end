import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: false
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDRESS_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }    
        case actionTypes.ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }    
        default:
            return state;
    }
}

export default addressReducer;
