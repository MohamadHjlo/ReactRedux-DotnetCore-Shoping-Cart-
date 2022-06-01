import { useState, useContext } from "react";
import PostContext from "../../context/PostContext";
const DeletePost = ({ postId }) => {
  const [loading, setLoading] = useState(false);

  const { deletepost } = useContext(PostContext);
  const handleDelete = async (e) => {
    setLoading(true);
    await deletepost(postId);
    setLoading(false);
  };
  return (
    <>
      {loading && <div className="spinner spinner-border"></div>}
      <button
        onClick={(e) => handleDelete(e)}
        className="btn bg-danger float-start "
      >
        Delete
      </button>
    </>
  );
};

export default DeletePost;
