import { combineReducers } from "redux";
import productReducer from "./Product/productReducer";
import cartReducer from "./Cart/cartReducer";
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

export default rootReducer;
