import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:44493/postsandusers/GetUserById/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div>
      <div className="container mt-5">
        <div className="row g-3">
          <h1>{user && user.name + "  " + user.family}</h1>
          {error && <div>{error}</div>}
          {loading && <div className="spinner-border"></div>}
          {user && (
            <div className="col-4">
              <div key={user.id} className="card" style={{ width: " 18rem;" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-info  ">UserName : {user.name}</li>
                  <li className="list-group-item">Family : {user.family}</li>
                  <li className="list-group-item">
                    Describtion : {user.describtion}
                  </li>
                </ul>
                <div className="card-footer">ID : {user.id}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
