import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/Product/productActions";
import { seprate } from "../redux/Cart/cartActions";
import { addToCart } from "../redux/Cart/cartActions";
function Products() {
  const { products, loading, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const handleaddToCart = async (id) => {
    dispatch(await addToCart(id));
  };

  useEffect(() => {
    const fetchproducts = async () => {
      dispatch(await getProducts());
    };
    fetchproducts();
   
  }, [dispatch]);

  return (
    <>
      <h1>Products</h1>
      <div className="container">
        {error && <h3 className="text-danger">{error}</h3>}

        <div className="row">
          {loading && (
            <div
              className=" col-6 mr-5 ml-5 mt-5"
              style={{ transform: "translate(532px, 82px)" }}
            >
              <span className="spinner spinner-border text-info"></span>
            </div>
          )}
          {products &&
            products.map((product) => (
              <div className="col-md-3" key={product.id}>
                <div className="card">
                  <div className="card-img-top">
                    <img
                      src={product.image}
                      alt="product"
                      width="250"
                      height="250"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="card-body">
                    <div className="card-title">{product.name}</div>
                    <p className="card-text">{product.describtion}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      onClick={() => handleaddToCart(product.id)}
                      className="btn btn-sm btn-outline-success"
                    >
                      Add To Cart
                    </button>
                    <span> {seprate(product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Products;
