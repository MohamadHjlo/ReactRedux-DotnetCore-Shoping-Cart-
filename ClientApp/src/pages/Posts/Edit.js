import { useState, useEffect, useContext } from "react";

import PostContext from "../../context/PostContext";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const { post, updatepost, getpostById } = useContext(PostContext);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      await getpostById(postId);
    };
    fetchPost();
    setLoading(false);
  }, [postId]);

  const hendleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updatepost(postId, title, body);
    setLoading(false);
  };

  return (
    <>
    {}
      <h1>Edit Post</h1>
      <h2>{error}</h2>
      <form onSubmit={(e) => hendleSubmit(e)} className="mt-5">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            defaultValue={post.title}
          />
          <div className="form-text text-danger">
            {!title && "Title is Requierd"}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Body</label>

          <textarea
            onChange={(e) => setBody(e.target.value)}
            type="password"
            className="form-control"
            defaultValue={post.body}
          />
          <div className="form-text text-danger">
            {!body && "Post text must have a value"}
          </div>
        </div>

        <button
          type="submit"
          disabled={title === "" || body === ""}
          className="btn bg-teal bg-gradient"
        >
          Submit
        </button>
        {loading && <div className="spinner-border text-info"></div>}
      </form>
    </>
  );
};
export default EditPost;
