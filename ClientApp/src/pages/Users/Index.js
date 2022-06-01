import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListUsers from "../../components/Users/List";

const UsersIndex = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/postsandusers/GetAllUsers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  return (
    <div>
      <div className="container mt-5">
        <div className="row g-3">
          <h1>Hello, Users!</h1>
          <Link to={"/users/createnewuser"}  className="btn bg-teal col-2 fw-bold mb-5 ml-3 mt-5 shadow">Add new User</Link>
          {error && <div>{error}</div>}
          {loading && <div className="spinner-border"></div>}
          {users && <ListUsers  users={users}/>}
        </div>
      </div>
    </div>
  );
};

export default UsersIndex;
