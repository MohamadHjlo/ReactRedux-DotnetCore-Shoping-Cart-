import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartQty } from "../../redux/Cart/cartActions";
function Cart() {
  const { qty, cartproducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartQty());
  }, [dispatch, cartproducts]);

  return <span className="badge rounded-pill bg-primary me-1"> { qty } </span>;
}

export default Cart;
