import { FETCH_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  pseudo: "",
  userId: ""
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case FETCH_USER:
      if (action.value) {
        nextState = {
          ...state,
          isAuthenticated: true,
          pseudo: action.value.substring(1, action.value.length - 1)
          //currentUser: action.payload
        };
      }
      return nextState || state;

    default:
      return state;
  }
};
