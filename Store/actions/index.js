import { FETCH_USER } from "./types";
import Fire from "../../Fire";

export const fetchUser = () => dispatch => {
  console.log("haha");
  Fire.shared.authRef.onAuthStateChanged(user => {
    if (user) {
      console.log("utilisateur connecté");
      // requete pseudo
      Fire.shared.getUser(Fire.shared.uid, user => {
        dispatch({
          type: FETCH_USER,
          value: user
        });
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
    .then(() => {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    })
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

export const fetchChannels = () => dispatch => {
  return Fire.shared.onChannel(channel => {
    dispatch(addChannel(channel));
  });

  /* simulate communication w the server */
  /*
  setTimeout(() => {
    dispatch(addGames(GAMES));
  }, 2000);
  */
};

export const addChannels = channels => ({
  type: ActionTypes.FETCH_CHANNELS,
  value: channels
});

export const addChannel = channel => ({
  type: ActionTypes.ADD_CHANNEL,
  value: channel
});
