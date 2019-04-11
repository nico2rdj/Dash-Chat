import React from "react";
import { View, KeyboardAvoidingView, Image, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from "react-redux";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pseudo: "",
      user: null
    };
    this.signInConnexion = this.signInConnexion.bind(this);
  }

  componentWillMount() {
    this.props.auth.db.off();
    const actionLogout = {
      type: "LOGOUT",
      value: null
    };
    this.props.dispatch(actionLogout);
    const actionRemoveChannel = {
      type: "REMOVE_CHANNELS",
      value: null
    };
    this.props.dispatch(actionRemoveChannel);
  }

  signInConnexion() {
    this.props.auth.db
      .onLogin(this.state.email, this.state.password)
      .then(user => {
        this.props.auth.db.getUser(this.props.auth.db.uid, user => {
          this.setState(
            {
              user: user
            },
            () => {
              /* pseudo et user id dans le store */
              const action = {
                type: "FETCH_USER",
                value: [
                  JSON.stringify(this.state.user["pseudo"]),
                  this.props.auth.db.uid
                ]
              };
              this.props.dispatch(action);

              /* channel dans le store */
              let actionChannel = {};
              this.props.auth.db.onChannel(channel => {
                actionChannel = {
                  type: "ADD_CHANNEL",
                  value: channel
                };
                this.props.dispatch(actionChannel);
              });
            }
          );

          this.props.navigation.navigate("Main", {
            main_title: this.props.auth.pseudo
          });
        });
      })
      .catch(error => {
        const { code, message } = error;
        console.log(message);
        console.log(code);
      });
  }

  render() {
    return (
      <View style={{ paddingVertical: 10, backgroundColor: "white" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../assets/messenger.png")}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
          <Text style={{ color: "#ff990a", fontSize: 25, fontWeight: "bold" }}>
            Dash Chat
          </Text>
        </View>
        <Card>
          <FormLabel labelStyle={{ fontSize: 18 }}>
            Vous avez un compte
          </FormLabel>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email..."
            onChangeText={text => {
              this.setState({ email: text });
            }}
          />
          <FormLabel>Mot de passe</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Mot de passe..."
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />

          <Button
            buttonStyle={{ marginTop: 10 }}
            backgroundColor="#ff990a"
            title="CONNEXION"
            onPress={() => {
              this.signInConnexion();
            }}
          />
        </Card>

        <View style={{ justifyContent: "center" }}>
          <Card>
            <FormLabel labelStyle={{ fontSize: 18 }}>
              Continuer en mode anonyme
            </FormLabel>

            <FormInput
              placeholder="Votre pseudo"
              onChangeText={text => {
                this.setState({ pseudo: text });
              }}
            />
            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="ANONYME"
              onPress={() => {
                this.props.auth.db.authRef.signInAnonymously().then(user => {
                  /* user dans le store */
                  const action = {
                    type: "FETCH_USER",
                    value: [
                      JSON.stringify(this.state.pseudo),
                      this.props.auth.db.uid
                    ]
                  };
                  this.props.dispatch(action);

                  /* channel dans le store */
                  let actionChannel = {};
                  this.props.auth.db.onChannel(channel => {
                    actionChannel = {
                      type: "ADD_CHANNEL",
                      value: channel
                    };
                    this.props.dispatch(actionChannel);
                  });

                  const newUser = {
                    pseudo: this.state.pseudo
                  };
                  this.props.auth.db.refUser.push(newUser);

                  this.props.navigation.navigate("Main", {
                    main_title: this.state.pseudo
                  });
                });
              }}
            />
          </Card>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Signin);
