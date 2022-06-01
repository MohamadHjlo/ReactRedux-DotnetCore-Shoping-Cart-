import { useContext, useState } from "react";
import todoContext from "../../context/TodoContext";

const UpdateTodo = ({ completed, todoId }) => {
  const { updateTodo } = useContext(todoContext);
  const [loading, setLoading] = useState(false);

  const hendleUpdate = async (e, completed, todoId) => {
    e.preventDefault();
    setLoading(true);
    await updateTodo(todoId, completed);
    setLoading(false);
  };
  return (
    <>
      {loading ? <div className="spinner-border text-info"></div> : ""}
      <i
        className={completed ? "bi bi-check-all fs-4 text-primary" : "bi bi-check fs-4  "}
        style={{ cursor: "pointer" }}
        onClick={(e) => hendleUpdate(e, completed, todoId)}
      ></i>
    </>
  );
};
export default UpdateTodo;
 