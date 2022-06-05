import axios from "axios";
import Swal from "sweetalert2";
import {
  ADD_TO_CART,
  GET_CART,
  REMOVE_CART_ITEM,
  SET_ERROR,
  SET_LOADING,
  SET_QUANTITY,
  INCDEC_QUANTITY,
  SET_Remove_Loading,
  CLEARCART,
} from "./cartActionsTypes";

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

export const setCart = (items) => {
  return {
    type: GET_CART,
    payload: items,
  };
};

export const setAddToCart = (items) => {
  return {
    type: ADD_TO_CART,
    payload: items,
  };
};

export const setQuantity = (quantity) => {
  return {
    type: SET_QUANTITY,
    payload: quantity,
  };
};

export const setRemoveLoading = (status) => {
  return {
    type: SET_Remove_Loading,
    payload: status,
  };
};

export const incdecQuantity = (item) => {
  return {
    type: INCDEC_QUANTITY,
    payload: item,
  };
};

export const removeCartItem = (id) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: id,
  };
};
export const setclearCart = (id) => {
  return {
    type: CLEARCART,
    payload: id,
  };
};
export const seprate = (number) => {
  number += "";
  number = number.replace(",", "");
  number = number.replace(",", "");
  number = number.replace(",", "");
  number = number.replace(",", "");
  number = number.replace(",", "");
  number = number.replace(",", "");
  let x = number.split(".");
  let y = x[0];
  let z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, `\$1,\$2`);
  return y + z;
};

export const getCartQty = () => {
  return function (dispatch) {
    try {
      dispatch(setLoading(true));
      axios
        .get(`/cart/GetCartQuantity`)
        .then((res) => {
          dispatch(setQuantity(res.data));
        })
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

export const getProducts = () => {
  return function (dispatch) {
    try {
      dispatch(setLoading(true));
      axios
        .get("./cart/Get")
        .then((res) => {
          dispatch(setCart(res.data));
        })
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
export const addToCart = async (id) => {
  return async function (dispatch) {
    try {
      await axios({
        method: "POST",
        url: `/cart/AddToCart?id=${id}`,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          dispatch(setQuantity(res.data.newQty));
          Swal.fire({
            title: res.data.message,
            icon: "success",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
        })
        .catch((err) => {
          console.log("err :>> ", err);
          dispatch(setError(err.message));
        });

      dispatch(setLoading(false));
      dispatch(setError(""));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};
export const incrementQty = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      await axios({
        method: "POST",
        url: `/cart/IncDecCartQuantity?id=${id}&isAdd=true`,
        data: {
          id: id,
          isAdd: true,
        },
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          dispatch(incdecQuantity(res.data.newItem));
          Swal.fire({
            title: "Quantity Added",
            icon: "success",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: err.message,
            icon: "error",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
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

export const decrementQty = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      await axios({
        method: "POST",
        url: `/cart/IncDecCartQuantity?id=${id}&isAdd=false`,
        data: {
          id: id,
          isAdd: true,
        },
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          dispatch(incdecQuantity(res.data.newItem));
          Swal.fire({
            title: "Quantity Reduced",
            icon: "success",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: err.message,
            icon: "error",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
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
export const removeItemFromCart = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setRemoveLoading(true));
      await axios({
        method: "POST",
        url: `/cart/RemoveItemFromCart/${id}`,
        data: {
          id: id,
        },
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          dispatch(removeCartItem(id));
          Swal.fire({
            title: res.data.message,
            icon: "success",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: err.message,
            icon: "error",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
          dispatch(setError(err.message));
          dispatch(setRemoveLoading(false));
        });
      dispatch(setRemoveLoading(false));
      dispatch(setError(""));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setRemoveLoading(false));
    }
  };
};
export const cleatCart = (id) => {
  return async function (dispatch) {
    try {
     
      await axios({
        method: "POST",
        url: `/cart/ClearCart/${id}`,
        data: {
          id: id,
        },
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          dispatch(setclearCart(id));
          Swal.fire({
            title: res.data.message,
            icon: "success",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: err.message,
            icon: "error",
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            position: "top",
          });
          dispatch(setError(err.message));
          dispatch(setRemoveLoading(false));
        });
      dispatch(setRemoveLoading(false));
      dispatch(setError(""));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setRemoveLoading(false));
    }
  };
};
