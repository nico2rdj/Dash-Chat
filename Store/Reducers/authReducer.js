import { FETCH_USER, LOGOUT } from "../actions/types";
import Fire from "../../DataSource/Fire";

const initialState = {
  isAuthenticated: false,
  pseudo: "",
  userId: "",
  db: Fire.shared
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
    case LOGOUT:
      nextState = {
        ...state,
        isAuthenticated: false,
        pseudo: "",
        userId: ""
      };
      return nextState || state;

    default:
      return state;
  }
};
