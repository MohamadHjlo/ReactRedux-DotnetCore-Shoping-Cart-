import { useState,useContext } from "react";
import todoContext from "../../context/TodoContext";

const CreateNewTodo = () => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);
  const { createTodo } = useContext(todoContext);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const hendleCreate =async (e) => {
    e.preventDefault();
    setLoading(true);
    await createTodo(title,completed);
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={(e) => hendleCreate(e)} className="mt-5 row ">
        <div className=" col-6">
          <label className="form-label">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
          <div  className="form-text text-danger">
            {!title && "Title is Requierd"}
            {titleError}
          </div>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-around form-switch">
          <label > Completed ? </label>
          <input
            onChange={(e) => setCompleted(e.target.checked)}
            type="checkbox"
           
            className="form-check-input fs-2 "
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={title === ""}
            className="bg-gradient bg-teal btn col-6 mb-5 mt-5"
          >
            Submit
          </button>
        </div>

        {loading && <div className="spinner-border text-info"></div>}
      </form>
    </>
  );
};
export default CreateNewTodo;
