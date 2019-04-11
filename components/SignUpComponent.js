import React from "react";
import {
  View,
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Card, FormLabel, FormInput } from "react-native-elements";
import { connect } from "react-redux";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-gridy-sprites";
import SvgUri from "expo-svg-uri";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pseudo: "",
      avatar: null
    };

    this.onPressRegister = this.onPressRegister.bind(this);
  }

  onPressRegister = () => {
    this.props.auth.db.onRegister(
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

  render() {
    let options = {};
    let avatars = new Avatars(sprites(options));
    const svgB = avatars.create(this.state.pseudo);
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <SvgUri
              width="200"
              height="200"
              source={{
                uri:
                  "https://avatars.dicebear.com/v2/male/" +
                  this.state.pseudo +
                  ".svg"
              }}
            />
          </View>
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

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Signup);
