import firebase from "firebase";
class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAvHuVMK59wjErR6kR-u1HyT6Rj9qLt9Uw",
      authDomain: "chat-app-mobi.firebaseapp.com",
      databaseURL: "https://chat-app-mobi.firebaseio.com",
      projectId: "chat-app-mobi",
      storageBucket: "chat-app-mobi.appspot.com",
      messagingSenderId: "538510212038"
    };
    firebase.initializeApp(config);
  };
}
