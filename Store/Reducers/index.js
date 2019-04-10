import { combineReducers } from "redux";

import auth from "./authReducer";
import channel from "./channelReducer";

export default combineReducers({
  auth,
  channel
});
