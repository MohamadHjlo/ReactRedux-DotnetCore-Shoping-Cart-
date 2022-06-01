import React, { useEffect, useState, useContext } from "react";
import CreateNewTodo from "../../components/Todo/Create.js";
import FilterTodos from "../../components/Todo/Filter.js";
import ListTodos from "../../components/Todo/List.js";
import todoContext from "../../context/TodoContext.js";

const TodosIndex = () => {
  const { todos, getTodos, error } = useContext(todoContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const fetchData = async () => {
      await getTodos();
    };
    fetchData();

    setLoading(false);
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row g-3 ">
          <h1>Hello, Todos!</h1>
        

          {error && <div>{error}</div>}
          {loading && (
            <div className="col-12 text-center ">
              <div className="spinner-border mt-5"></div>
            </div>
          )}
          <CreateNewTodo />
          <FilterTodos setloading={setLoading} />
          {todos && <ListTodos todos={todos} />}
        </div>
      </div>
    </div>
  );
};

export default TodosIndex;
