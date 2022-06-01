import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PostContext from "../../context/PostContext";
import ListPosts from "../../components/Posts/List";

const PostsIndex = () => {
  const { getposts, posts, error } = useContext(PostContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      await getposts();
    };
    fetchPosts();
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row g-3 ">
          <h1>Hello, Posts!</h1>
          <Link
            to={"/posts/createnewpost"}
            className="btn bg-teal col-2 fw-bold mb-5 ml-3 mt-5 shadow"
          >
            Add new Post
          </Link>
          {error && <div>{error}</div>}
          {loading && <div className="spinner-border"></div>}
          {posts && <ListPosts posts={posts} />}
        </div>
      </div>
    </div>
  );
};

export default PostsIndex;
