import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./custom.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  return (
     <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Provider>
  );
}
export default App;
