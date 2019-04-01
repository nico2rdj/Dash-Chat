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
      password: ""
    };
    this._toggleFavorite = this._toggleFavorite.bind(this);
  }

  componentDidMount() {
    console.log("componentDidUpdate : ");
    console.log(this.props);
    //this.props.fetchUser();
  }

  componentDidUpdate() {
    console.log(this.props);
    //this.props.fetchUser();
  }

  _toggleFavorite() {
    Fire.shared.authRef
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const action = { type: "FETCH_USER", value: "Fire.shared.isConnected" };
        this.props.dispatch(action);
        console.log("success");
        this.props.navigation.navigate("SignedIn");
      })
      .catch(error => {
        const { code, message } = error;
        console.log(message);
        console.log(code);
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email address..."
            onChangeText={text => {
              this.setState({ email: text });
            }}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Password..."
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps)(Signin);
