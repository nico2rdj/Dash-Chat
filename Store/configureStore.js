import { createStore } from "redux";
import combineReducer from "./Reducers/index";

export default createStore(combineReducer);
