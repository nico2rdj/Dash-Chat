import { FETCH_CHANNELS, ADD_CHANNEL } from "../actions/types";
import Fire from "../../Fire";

const initialState = {
  channels: [],
  isIn: 0
};

export default (state = initialState, action) => {
  let nextState;
  let channels_tmp = [];
  switch (action.type) {
    case FETCH_CHANNELS:
      Fire.shared.onChannelT(channel => {
        channels_tmp.push(channel);
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        console.log(channels_tmp.length);
      });

      console.log("laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(channels_tmp.length);
      nextState = {
        ...state,
        channels: channels_tmp,
        isIn: channels_tmp.length
      };
      return nextState || state;
    case ADD_CHANNEL:
      console.log(state.channels.length);
      return { ...state, channels: state.channels.concat(action.value) };

    default:
      return state;
  }
};
