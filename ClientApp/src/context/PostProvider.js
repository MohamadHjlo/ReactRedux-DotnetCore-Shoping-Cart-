import PostContext from "./PostContext";
import { useReducer } from "react";
import Postreducer from "./postReducer";
import axios from "axios";
import Swal from "sweetalert2";

const PostProvider = ({ children }) => {
  const initialState = {
    posts: [],
    error: "",
    post: [],
  };
  //                           switch case func   default state
  const [state, dispatch] = useReducer(Postreducer, initialState);

  const getposts = async () => {
    try {
      const res = await axios.get("/postsandusers/GetAllposts");
      dispatch({ type: "SET_POSTS", payload: res.data });
    } catch (error) {
      dispatch({ type: "SET_Error", payload: error });
    }
  };
  const getpostById = async (postId) => {
    try {
      const res = await axios.get(`/postsandusers/GetPostById/${postId}`);

      dispatch({ type: "GET_BY_ID", payload: res.data });
      console.log('post :>> ', state.post);
    } catch (error) {
      dispatch({ type: "SET_Error", payload: error });
    }
  };
  const createpost = async (title, body) => {
    await axios({
      method: "POST",
      processData: false,
      url: "/postsandusers/Createpost",
      data: {
        Title: title,
        Body: body,
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
          dispatch({ type: "CREATE_POST", payload: res.data.createdpost });
        } catch (err) {
          Swal.fire("Error !", err.message, "error");
        }
      })
      .catch((err) => {
        console.log("err ;>> ", err.response);
        Swal.fire("Error !", err.response.data.errors.Title.join(), "error");
        Swal.fire("Error !", err.response.data.errors.Body.join(), "error");
      });
  };

  const updatepost = async (postId, title, body) => {
    await axios({
      method: "POST",
      processData: false,
      url: `/postsandusers/UpdatePost/`,
      data: {
        Id: postId,
        Title: title,
        Body: body,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log('res :>> ', res);
        try {
          if (res.status === 400) {
             Swal.fire("Error !", Object.values(res.response.data.errors).join(), "error");
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
          dispatch({ type: "UPDATE_POST", payload: res.data.updatedpost });
        } catch (err) {
          Swal.fire("Error !", err.message, "error");
        }
      })
      .catch((err) => {
       
        Swal.fire("Error !", Object.values(err.response.data.errors).join(), "error");
      });
  };

  const deletepost = async (postId) => {
    await Swal.fire({
      title: "Delete post",
      text: "Are you Sure to Delete this post ?",
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
          url: `/postsandusers/DeletePost/${postId}`,
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
              dispatch({ type: "DELETE_POST", payload: postId });
            } catch (err) {
              Swal.fire("Error !", err.message, "error");
            }
          })
          .catch((err) => {
            Swal.fire("Error !", err.message, "error");
          });
      } else {
        return;
      }
    });
  };

  return (
    <div>
      <PostContext.Provider
        value={{
          ...state,
          getposts,
          createpost,
          updatepost,
          deletepost,
          getpostById,
          
        }}
      >
        {children}
      </PostContext.Provider>
    </div>
  );
};

export default PostProvider;
