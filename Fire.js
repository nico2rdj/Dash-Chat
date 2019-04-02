import firebase from "firebase";
import { connect } from "react-redux";
class Fire {
  constructor() {
    this.init();
    this.observeAuth();
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

  // check si on est connecté
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  // appel pour la connexion
  onAuthStateChanged = user => {
    if (!user) {
      try {
        // si on était pas connecté nous connecte en mode anonyme
        //firebase.auth().signInAnonymously();
        console.log("pas connecté");
      } catch ({ message }) {
        alert(message);
      }
      return null;
    } else {
      return user;
    }
  };

  get isConnected() {
    var status = false;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("connecté !");
        status = true;
      } else {
        console.log("pas connecté !");
      }
    });
    return status;
  }

  // inscription
  onRegister = (email, password, pseudo) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const newUser = {
          pseudo: pseudo,
          email: email,
          password: password,
          id: Fire.shared.uid
        };
        Fire.shared.refUser.push(newUser);
      })

      .catch(error => {
        const { code, message } = error;
        console.log(message);
        console.log(code);
        console.log(password);
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  };

  // connexion
  onLogin = (email, password) => {
    Fire.shared.authRef
      .signInWithEmailAndPassword(email, password)
      .then(user => {})
      .catch(error => {
        const { code, message } = error;
        console.log(message);
        console.log(code);
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  };

  /*
  onAnonymously = pseudo => {
    firebase
      .auth()
      .signInAnonymously()
      .then(user => {
        const user = {
          pseudo: pseudo
        };
        this.refUser.push(user);
      });
  };
*/
  // retourne de la route messages dans la db
  get ref() {
    return firebase.database().ref("messages");
  }

  get refUser() {
    return firebase.database().ref("users");
  }

  get idChannel() {
    return this.state.idChannel;
  }

  // retourne de la route channel dans la db
  get refChannel() {
    return firebase.database().ref("channel");
  }

  get authRef() {
    return firebase.auth();
  }

  get provider() {
    return new firebase.auth.GoogleAuthProvider();
  }

  // recupere les 20 derniers messages de la /messages et dès qu'il y a un nouveau
  // message ajouté on le récupère et on le passe a la methode parse
  onChannel = callback =>
    this.refChannel
      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parseChannel(snapshot)));

  // recupere les 20 derniers messages de la /messages et dès qu'il y a un nouveau
  // message ajouté on le récupère et on le passe a la methode parse
  on = callback =>
    this.ref

      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parse(snapshot)));

  // recupere les 20 derniers messages de la /messages et dès qu'il y a un nouveau
  // message ajouté on le récupère et on le passe a la methode parse
  onMessages = (idChannel, callback) =>
    firebase
      .database()
      .ref("channel/" + idChannel + "/messages")
      .limitToLast(5)
      .on("child_added", snapshot => callback(this.parse(snapshot)));

  // recupere les 20 derniers messages de la /messages et dès qu'il y a un nouveau
  // message ajouté on le récupère et on le passe a la methode parse
  onMessagesRefresh = (idChannel, callback, size) => {
    console.log("ici !");
    firebase
      .database()
      .ref("channel/" + idChannel + "/messages")
      .limitToLast(size)
      .on("child_added", snapshot => callback(this.parse(snapshot)));
  };

  // traitement du nouveau message
  parse = snapshot => {
    // recupere les valeurs du snapshot contenant le nouveau message
    // pour les mettres dans le format de giftedchat
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);
    // message dans le format de giftedchat
    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };

  parseChannel = snapshot => {
    // recupere les valeurs du snapshot contenant le nouveau message
    // pour les mettres dans le format de giftedchat
    const { timestamp: numberStamp, name, user } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);
    // message dans le format de giftedchat
    const channel = {
      _id,
      timestamp,
      name,
      user
    };
    return channel;
  };

  // Se deconnecté de la db
  off() {
    this.ref.off();
  }

  // recupere l'id de l'utilisateur connecté
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get email() {
    return (firebase.auth().currentUser || {}).email;
  }

  // recupere l'heure sur le serveur
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // loop sur un tableau de messages
  // on les mets au bon format
  // on les push sur le serveur
  send = (idChannel, messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      console.log(idChannel);

      // 4.
      const message = {
        text,
        user,
        timestamp: this.timestamp,
        channelId: idChannel
      };
      this.append(message);
    }
  };

  sendMessageChannel = (idChannel, messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      // 4.
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };

      this.appendMessageChannel(message, idChannel);
    }
  };

  // ajout de message dans la db
  appendMessageChannel = (message, idChannel) =>
    firebase
      .database()
      .ref("channel/" + idChannel + "/messages")
      .push(message);

  // loop sur un tableau de channels
  // on les mets au bon format
  // on les push sur le serveur
  sendChannel = channel => {
    const name = channel.name;
    const user = channel.user;
    const email = channel.mail;

    const newChannel = {
      name,
      user,
      email,
      timestamp: this.timestamp,
      messages: []
    };
    this.appendChannel(newChannel);
  };

  // ajout de message dans la db
  append = message => this.ref.push(message);

  // ajout de message dans la db
  appendChannel = channel => {
    var newChannel = this.refChannel.push(channel).then(() => {
      return newChannel.name();
    });
  };
}

Fire.shared = new Fire();

export default Fire;
