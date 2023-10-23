import * as actionTypes from "../ActionTypes/Items";

const initialState = {
  items: [],
  item: {},
  quantity: 0,
  loading: false,
  error: null,
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.CREATE_ITEM_SUCCESS:
      return {
        ...state,
        items: action?.items,
        quantity: action?.quantity,
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        item: action?.item,
        quantity: action?.quantity,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        item: action?.item,
        quantity: action?.quantity,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default itemsReducer;
