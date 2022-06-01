import DeleteTodo from "./Delete";
import UpdateTodo from "./Update";

const ListTodos = ({ todos }) => {
  return (
    <div className="row ">
      {todos.map((t) => (
        <div key={t.id} className="col-6 col-md-4 col-sm-6 mb-5">
          <div
            className={
              "card  pro-todo-shadow border border-white" + (t.completed ? "  bg-light" : "")
            }
            style={{ width: "18rem" }}
          >
            <div className="card-body d-flex justify-content-between align-items-center text-break">
              <div
                className={t.completed ? "text-decoration-line-through" : ""}
              >
                {t.title}
              </div>
              <div className="d-flex justify-content-between align-items-center">
               
                <DeleteTodo todoId={t.id}/>
                <UpdateTodo completed={t.completed} todoId={t.id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTodos;
