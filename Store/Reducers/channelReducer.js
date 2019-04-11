import { FETCH_CHANNELS, ADD_CHANNEL } from "../actions/types";
import Fire from "../../Fire";

const initialState = {
  channels: []
};

export default (state = initialState, action) => {
  let nextState;
  let channels_tmp = [];
  switch (action.type) {
    case FETCH_CHANNELS:
      Fire.shared.onChannelT(channel => {
        channels_tmp.push(channel);
      });

      nextState = {
        ...state,
        channels: channels_tmp
      };
      return nextState || state;
    case ADD_CHANNEL:
      return { ...state, channels: state.channels.concat(action.value) };

    default:
      return state;
  }
};
