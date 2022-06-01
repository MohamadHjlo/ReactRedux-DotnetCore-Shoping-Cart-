import { useState, useContext } from "react";
import PostContext from "../../context/PostContext";


const CreatenewPost = () => {
  const { createpost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
 

  const hendleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createpost(title, body);
    setLoading(false);
  };
  return (
    <>
      <h1>CreatePost</h1>
      <form onSubmit={(e) => hendleSubmit(e)} className="mt-5">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
          <div key={"titleerror"} className="form-text text-danger">
            {!title && "Title is Requierd"}
           
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Body</label>

          <textarea
            onChange={(e) => setBody(e.target.value)}
            type="password"
            className="form-control"
          />
          <div key={"bodyerror"} className="form-text text-danger">
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
export default CreatenewPost;
