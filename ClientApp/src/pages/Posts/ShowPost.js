import { post } from "jquery";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import postContext from "../../context/PostContext";

const ShowPost = () => {
  const { postId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getpostById, post } = useContext(postContext);

  useEffect(() => {
    setLoading(true);

    const fetchPost = async () => {
      await getpostById(postId);
    };
    fetchPost();
    
    setLoading(false);
  }, [postId]);

  return (
    <div>
      <div className="container mt-5">
        <div className="row g-3">
          <h1>{post && post.title}</h1>
          {error && <div>{error}</div>}
          {loading && <div className="spinner-border"></div>}
          {post && (
            <div className="col-4">
              <div key={post.id} className="card" style={{ width: " 18rem;" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-info  ">{post.title}</li>
                  <li className="list-group-item"> {post.body}</li>
                </ul>
                <div className="card-footer">ID : {post.id}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
