import TodoContext from "./TodoContext";
import { useReducer } from "react";
import Todoreducer from "./todoReducer";
import axios from "axios";
import Swal from "sweetalert2";

const TodoProvider = ({ children }) => {
  const initialState = {
    todos: [],
    error: "",
  };
  //                           switch case func   default state
  const [state, dispatch] = useReducer(Todoreducer, initialState);

  const getTodos = async () => {
    try {
      const res = await axios.get("/todos/GetAllTodos");
      dispatch({ type: "SET_TODOS", payload: res.data });
    } catch (error) {
      dispatch({ type: "SET_Error", payload: error });
    }
  };

  const getTodoByRange = async (pageSize) => {
    await axios.get(`/todos/GetByRange/${pageSize}`).then((res) => {
      try {
        dispatch({ type: "SET_TODOS", payload: res.data });
      } catch (error) {
        dispatch({ type: "SET_Error", payload: error });
      }
    });
  };

  const createTodo = async (title, completed) => {
    await axios({
      method: "POST",
      processData: false,
      url: "/todos/CreateTodo",
      data: {
        Title: title,
        Completed: completed,
      },

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        try {
          if (res.status === 400) {
            res.data.errors.Title !== ""
              ? Swal.fire("Error !", res.data.errors.Title.join(), "error")
              : Swal.fire("Error !", res.data.errors, "error");
          } else {
            Swal.fire("Succesful !", res.data.message, "success");
          }
          dispatch({ type: "CREATE_TODO", payload: res.data.createdTodo });
        } catch (err) {
          Swal.fire("Error !", err.message, "error");
        }
      })
      .catch((err) => {
        console.log("err ;>> ", err.response);
        Swal.fire("Error !", err.response.data.errors.Title.join(), "error");
      });
  };

  const updateTodo = async (todoId, completed) => {
    await axios({
      method: "POST",
      processData: false,
      url: `/todos/UpdateTodoStatus/${todoId}?completed=${!completed}`,
      data: JSON.stringify({
        completed: completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        try {
          if (res.status === 400) {
            res.data.errors.Title !== ""
              ? Swal.fire("Error !", res.data, "error")
              : Swal.fire("Error !", res.data.errors, "error");
          } else {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              timerProgressBar: true,
              timer: 3000,
              toast: true,
              showConfirmButton: false,
              position: "top",
            });
          }
          dispatch({ type: "UPDATE_TODO", payload: res.data.updatedTodo });
        } catch (err) {
          Swal.fire("Error !", err.message, "error");
        }
      })
      .catch((err) => {
        console.log("err ;>> ", err.response);
        Swal.fire("Error !", err.message, "error");
      });
  };

  const deleteTodo = async (todoId) => {
   await Swal.fire({
      title: "Delete Todo",
      text: "Are you Sure to Delete this Todo ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#7cacbe",
      confirmButtonText: "Yes , Delete it",
      cancelButtonText: "No , Cancel",
    }).then(async (result) => {
      if (result.value) {
        await axios({
          method: "POST",
          processData: false,
          url: `/todos/DeleteTodo/${todoId}`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => {
            try {
              if (res.status === 400) {
                res.data.errors.Title !== ""
                  ? Swal.fire("Error !", res.data, "error")
                  : Swal.fire("Error !", res.data.errors, "error");
              } else {
                Swal.fire({
                  title: res.data.message,
                  icon: "success",
                  timerProgressBar: true,
                  timer: 3000,
                  toast: true,
                  showConfirmButton: false,
                  position: "top",
                });
              }
              dispatch({ type: "DELETE_TODO", payload: todoId });
            } catch (err) {
              Swal.fire("Error !", err.message, "error");
            }
          })
          .catch((err) => {
            Swal.fire("Error !", err.message, "error");
          });
      }else{
        return
      }
    });
  };

  return (
    <div>
      <TodoContext.Provider
        value={{ ...state, getTodos, getTodoByRange, createTodo, updateTodo,deleteTodo }}
      >
        {children}
      </TodoContext.Provider>
    </div>
  );
};

export default TodoProvider;
