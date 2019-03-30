import { FETCH_USER } from "./types";
import Fire from "../../Fire";

export const fetchUser = () => dispatch => {
  Fire.shared.authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  Fire.shared.authRef
    .signInWithPopup(Fire.shared.provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  Fire.shared.authRef
    .signOut()
    .then(() => {})
    .catch(error => {
      console.log(error);
    });
};
