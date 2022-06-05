import {
  GET_PRODUCTS,
  REMOVE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
  SET_ERROR,
  SET_LOADING,
} from "./productActionsTypes";

const initialState = { products: [], error: "", loading: false };

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, products: payload };
    case REMOVE_PRODUCT:
      return { ...state, products: payload };
    case SET_PRODUCT:
      return { ...state, products: payload };
    case UPDATE_PRODUCT:
      return { ...state, products: payload };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};

export default productReducer;
