import { FETCH_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  pseudo: ""
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case FETCH_USER:
      console.log(action.value);
      if (action.value) {
        nextState = {
          ...state,
          isAuthenticated: true
          //currentUser: action.payload
        };
      }
      return nextState || state;
    default:
      return state;
  }
};
