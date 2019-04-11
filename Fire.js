import firebase from "firebase";

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
      });
  };

  // connexion
  onLogin = (email, password) => {
    return Fire.shared.authRef.signInWithEmailAndPassword(email, password);
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

  get ref() {
    return firebase.database().ref("channel");
  }

  get refUser() {
    return firebase.database().ref("users");
  }

  // retourne de la route channel dans la db
  get refChannel() {
    return firebase.database().ref("channel");
  }

  get authRef() {
    return firebase.auth();
  }

  onSearchChannel = (text, callback) =>
    this.refChannel
      .orderByChild("name")
      .startAt(text)
      .once("child_added", snapshot => {
        callback(this.parseChannel(snapshot));
      });

  onMessages = (idChannel, callback) =>
    firebase
      .database()
      .ref("channel/" + idChannel + "/messages")
      .limitToLast(5)
      .on("child_added", snapshot => callback(this.parse(snapshot)));

  onMessagesRefresh = (idChannel, callback, size) => {
    firebase
      .database()
      .ref("channel/" + idChannel + "/messages")
      .limitToLast(size)
      .on("child_added", snapshot => callback(this.parse(snapshot)));
  };

  getUser = (idUser, callback) => {
    firebase
      .database()
      .ref("users")
      .orderByChild("id")
      .equalTo(idUser)
      .once("value", snapshot => callback(this.parsePseudo(snapshot)));
  };

  onChannel = callback =>
    this.refChannel.on("child_added", snapshot =>
      callback(this.parseChannel(snapshot))
    );

  parsePseudo = snapshot => {
    const user = {
      email: "",
      id: "",
      pseudo: ""
    };

    snapshot.forEach(element => {
      user.pseudo = element.child("pseudo");
      user.id = element.child("id");
      user.email = element.child("email");
    });

    return user;
  };

  // traitement du nouveau message
  parse = snapshot => {
    // recupere les valeurs du snapshot contenant le nouveau message
    // pour les mettres dans le format de giftedchat
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const createdAt = new Date(numberStamp);
    // message dans le format de giftedchat
    const message = {
      _id,
      createdAt,
      text,
      user
    };
    return message;
  };

  formatDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  parseChannel = snapshot => {
    const { timestamp: numberStamp, name, user, pseudo } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = this.formatDate(numberStamp);

    const channel = {
      _id,
      timestamp,
      name,
      user,
      pseudo
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
    const pseudo = channel.pseudo;

    const newChannel = {
      name,
      user,
      pseudo,
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
