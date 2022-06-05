const Redux = require("redux");

const INCREMENT = "increament";
const DECREMENT = "decreament";

function incrementCount() {
  return {
    type: INCREMENT,
    action: "do some action",
  };
}
function incrementAge() {
  return {
    type: INCREMENT,
    action: "do some action",
  };
}
function decrement() {
  return {
    type: DECREMENT,
    action: "do some action",
  };
}

const countInitialState = { count: 0 };
const ageInitialState = { age: 20 };

function CountReducer(state = countInitialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      break;
  }
}
function AgeReducer(state = ageInitialState, action) {
  switch (action.type) {

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      break;
  }
}
const store = Redux.createStore(CountReducer);

store.dispatch(incrementCount());

console.log("sotore :>> ", store.getState());
