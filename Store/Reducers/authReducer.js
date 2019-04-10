import { FETCH_USER, FETCH_CHANNELS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  pseudo: "",
  userId: "",
  isIn: false
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case FETCH_USER:
      if (action.value) {
        nextState = {
          ...state,
          isAuthenticated: true,
          pseudo: action.value[0].substring(1, action.value[0].length - 1),
          userId: action.value[1]
        };
      }
      return nextState || state;
    case "dkdkd":
      nextState = { ...state, isIn: true };
      return nextState || state;

    default:
      return state;
  }
};
