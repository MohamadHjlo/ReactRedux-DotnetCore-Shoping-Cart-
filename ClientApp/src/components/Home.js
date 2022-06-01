import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Todos,Posts,Users</h1>
      <div className="container">
        <div className="row">
        <Link to={"/Posts"} className="btn bg-indigo col-2 fw-bold mb-5 ml-3 mt-5 shadow">
          Posts
        </Link >
        <Link to={"/Users"} className="btn bg-teal col-2 fw-bold mb-5 ml-3 mt-5 shadow">
          Users
        </Link>
        <Link to={"/Todos"} className="btn bg-light-danger col-2 fw-bold mb-5 ml-3 mt-5 shadow">
          Todos
        </Link >
        </div>
       
      </div>
    </div>
  );
};

export default Home;
