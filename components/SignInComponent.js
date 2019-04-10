import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import Fire from "../Fire";
import { connect } from "react-redux";
import { fetchUser } from "../Store/actions";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pseudo: "",
      user: null,
      dbPseudo: ""
    };
    this._toggleFavorite = this._toggleFavorite.bind(this);
  }

  componentDidMount() {
    console.log("componentDidUpdate : ");
    //console.log(this.props);
    //this.props.fetchUser();
  }

  componentDidUpdate() {
    //console.log(this.props);
    //this.props.fetchUser();
  }

  componentWillMount() {
    this.props.navigation.setParams({ main_title: this.props.auth.pseudo });
  }

  _toggleFavorite() {
    Fire.shared.authRef
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        Fire.shared.getUser(Fire.shared.uid, user => {
          this.setState(
            {
              user: user
            },

            () => {
              const action = {
                type: "FETCH_USER",
                value: [
                  JSON.stringify(this.state.user["pseudo"]),
                  Fire.shared.uid
                ]
              };
              this.props.dispatch(action);

              let actionC = {};
              Fire.shared.onChannel(channel => {
                actionC = {
                  type: "ADD_CHANNEL",
                  value: channel
                };
                this.props.dispatch(actionC);
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
      <View style={{ paddingVertical: 20 }}>
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
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="CONNEXION"
            onPress={() => {
              this._toggleFavorite();

              // .then(() => { navigation.navigate("SignedIn"); });
            }}
          />
        </Card>
        <View style={{ justifyContent: "center" }}>
          <Card>
            <FormLabel>Continuer en mode anonyme</FormLabel>
            <FormInput
              placeholder="Votre pseudo"
              onChangeText={text => {
                this.setState({ pseudo: text });
              }}
            />
            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="black"
              title="ANONYME"
              onPress={() => {
                Fire.shared.authRef.signInAnonymously().then(user => {
                  const action = {
                    type: "FETCH_USER",
                    value: "Fire.shared.isConnected"
                  };
                  this.props.dispatch(action);
                  console.log("success");
                  const newUser = {
                    pseudo: this.state.pseudo
                  };
                  Fire.shared.refUser.push(newUser);

                  this.props.navigation.navigate("SignedIn");
                });
                console.log("haha");

                // .then(() => { navigation.navigate("SignedIn"); });
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
