import axios from "axios";

import {
  GET_PRODUCTS,
  REMOVE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
  SET_ERROR,
  SET_LOADING,
} from "./productActionsTypes";

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};

export const setError = (status) => {
  return {
    type: SET_ERROR,
    payload: status,
  };
};

export const setProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
};

export const getProducts = async () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      await axios
        .get("./cart/GetProducts")
        .then((res) => dispatch(setProducts(res.data)))
        .catch((err) => {
          dispatch(setError(err.message));
          dispatch(setLoading(false));
        });
      dispatch(setLoading(false));
      dispatch(setError(""));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};
