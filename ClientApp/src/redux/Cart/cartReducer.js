import {
  ADD_TO_CART,
  GET_CART,
  REMOVE_CART_ITEM,
  SET_ERROR,
  SET_LOADING,
  SET_Remove_Loading,
  SET_QUANTITY,
  INCDEC_QUANTITY,
  CLEARCART,
} from "./cartActionsTypes";
const initialState = {
  cartproducts: [],
  subtotal: 0,
  loading: false,
  error: "",
  removeloading: false,
  qty: 0,
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CART:
      return { ...state, cartproducts: payload };
    case ADD_TO_CART:
      return { ...state, cartproducts: payload };
    case REMOVE_CART_ITEM:
      state.cartproducts = state.cartproducts.filter(
        (p) => p.productToCarts[0].id !== payload
      );
      return {
        ...state,
        cartproducts: state.cartproducts,
      };
    case CLEARCART:
      return { ...state, cartproducts: "" };
    case SET_Remove_Loading:
      return { ...state, removeloading: payload };

    case SET_ERROR:
      return { ...state, error: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    case INCDEC_QUANTITY:
      state.cartproducts = state.cartproducts.map((p) =>
        p.id === payload.productId ? { ...p, productToCarts: [payload] } : p
      );
      return {
        ...state,
        cartproducts: state.cartproducts,
      };
    case SET_QUANTITY:
      return { ...state, qty: payload };

    default:
      return state;
  }
};

export default cartReducer;
