import { FETCH_USER } from "./types";
import Fire from "../../Fire";

export const fetchUser = () => dispatch => {
  console.log("haha");
  Fire.shared.authRef.onAuthStateChanged(user => {
    if (user) {
      console.log("utilisateur connecté");
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      console.log("utilisateur non connecté");

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

export const onLogin = (email, password) => dispatch => {
  const email = email;
  const password = password;
  Fire.shared.authRef
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch(error => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
};

export const onRegister = (email, password) => {
  Fire.shared.authRef
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch(error => {
      const { code, message } = error;
      console.log(email);
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
};
