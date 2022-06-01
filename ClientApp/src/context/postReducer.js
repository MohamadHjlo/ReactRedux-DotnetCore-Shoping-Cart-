const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "SET_Error":
      return {
        ...state,
        error: action.payload,
      };
    case "CREATE_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, completed: action.payload }
            : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case "GET_BY_ID":
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
