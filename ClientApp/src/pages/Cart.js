import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  incrementQty,
  decrementQty,
  seprate,
  removeItemFromCart,
  cleatCart,
} from "../redux/Cart/cartActions";

function Cart() {
  const { cartproducts, loading, error, removeloading } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleIncreamentQty = (id) => {
   dispatch(incrementQty(id));
  };
  const handledecrementQty = (id,currentqty) => {
    currentqty > 1 ? dispatch(decrementQty(id)) : console.log("xxxxxxxxxxxxxx");
  };
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const handleClearCart = (id) => {
    dispatch(cleatCart(id));
  };
  return (
    <div>
      <div></div>
      {cartproducts.length !== 0 ? (
        <table className="table table-striped td-align-mid">
          <thead>
            {console.log("cartproducts", cartproducts)}
            <tr>
              <th scope="col">image</th>
              <th scope="col">name</th>
              <th scope="col">quantity</th>
              <th scope="col">price</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>

          <tbody>
            {cartproducts &&
              cartproducts.map((product) => (
                <tr key={product.productToCarts[0].id}>
                  <td>
                    <img
                      src={product.image}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                      }}
                      alt=""
                    />{" "}
                  </td>
                  <td>{product.name}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleIncreamentQty(product.productToCarts[0].id)
                      }
                      disabled={loading}
                      className="btn bg-teal mr-2"
                    >
                      +
                    </button>
                    <span className="fw-bold m-3">
                      {product.productToCarts.map((c) => c.quantity)}
                    </span>{" "}
                    <button
                      onClick={() =>
                        handledecrementQty(
                          product.productToCarts[0].id,
                          product.productToCarts.map((c) => c.quantity)
                        )
                      }
                      disabled={loading||product.productToCarts.map((c) => c.quantity)<=1}
                      className="ml-2 btn bg-light-danger"
                    >
                      -
                    </button>
                  </td>
                  <td>{seprate(product.productToCarts.map((c) => c.price))}</td>
                  <td>
                    {removeloading ? (
                      <span className="spinner spinner-border text-info"></span>
                    ) : (
                      <button
                        onClick={() =>
                          handleRemoveItem(product.productToCarts[0].id)
                        }
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan={2}>
                Sub Total : {"      "}
                {cartproducts &&
                  seprate(
                    cartproducts.reduce((total, product) => {
                      return (
                        total +
                        product.productToCarts.reduce((z, c) => {
                          return z + c.price;
                        }, 0)
                      );
                    }, 0)
                  )}
              </td>
              <td colSpan={2}>
                <button
                  onClick={() =>
                    handleClearCart(cartproducts[0].productToCarts[0].cartId)
                  }
                  className="btn bg-light-danger"
                >
                  Clear Cart
                </button>
              </td>
              <td colSpan={2}>
                <button className="btn bg-indigo">Go to Checkout</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="container text-center">
          <div
            className="bi bi-basket-fill "
            style={{ fontSize: "5rem" }}
          ></div>
          <h1 className="fw-bold">Cart is Empty !</h1>
        </div>
      )}
    </div>
  );
}

export default Cart;
