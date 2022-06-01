import { useContext, useState } from "react";
import todoContext from "../../context/TodoContext";

const DeleteTodo = ({ todoId }) => {
  const { deleteTodo } = useContext(todoContext);
  const [loading, setLoading] = useState(false);

  const hendleUpdate = async (e, todoId) => {
    e.preventDefault();
    setLoading(true);
    await deleteTodo(todoId);
    setLoading(false);
  };
  return (
    <>
      {loading ? <div className="spinner-border text-danger"></div> : ""}
      <i
        className="bi bi-trash-fill fs-6 text-danger "
        style={{ cursor: "pointer" }}
        onClick={(e) => hendleUpdate(e, todoId)}
      ></i>
    </>
  );
};
export default DeleteTodo;
