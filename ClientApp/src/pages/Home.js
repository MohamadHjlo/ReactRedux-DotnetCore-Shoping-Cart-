import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <h1>Todos,Posts,Users</h1>
      <div className="container">
        <div className="row">
        <Link to={"/"} className="btn bg-indigo col-2 fw-bold mb-5 ml-3 mt-5 shadow">
          Posts
        </Link >
        </div>
       
      </div>
    </div>
  );
};

export default Home;
