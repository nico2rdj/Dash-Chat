import React from "react";
import { View, Alert, Button } from "react-native";
import { Card, FormLabel, FormInput } from "react-native-elements";
import Fire from "../Fire";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pseudo: ""
    };

    this.onPressRegister = this.onPressRegister.bind(this);
  }

  componentDidMount() {}

  onPressRegister = () => {
    Fire.shared.onRegister(
      this.state.email,
      this.state.password,
      this.state.pseudo
    );

    Alert.alert(
      "Bienvenue !",
      this.state.pseudo,
      [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("SignIn")
        }
      ],
      { cancelable: false }
    );
  };

  // .then(() => navigation.navigate("SignedIn"));

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Pseudo</FormLabel>
          <FormInput
            placeholder="Pseudo..."
            onChangeText={text => {
              this.setState({ pseudo: text });
            }}
          />
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
            title="INSCRIPTION"
            onPress={this.onPressRegister}
          />
        </Card>
      </View>
    );
  }
}
