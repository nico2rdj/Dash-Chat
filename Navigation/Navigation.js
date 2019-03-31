import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Import the screens
import Main from "../components/MainComponent";
import Chat from "../components/ChatComponent";
// Import React Navigation
import {
  createStackNavigator,
  createSwitchNavigator,
  createTabNavigator
} from "react-navigation";

import { fetchUser } from "../Store/actions";
import { connect } from "react-redux";
import SignIn from "../components/SignInComponent";
import SignUp from "../components/SignUpComponent";

// Create the navigator

export const Signed = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat }
});

/*
export const SignedOut = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  }
});
*/

export const createRootNavigator = (signedIn = false) => {
  return createTabNavigator(
    {
      SignedIn: {
        screen: SignIn,
        navigationOptions: {
          title: "Connexion"
        }
      },
      SignedUp: {
        screen: SignUp,
        navigationOptions: {
          title: "Inscription"
        }
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedUp"
    }
  );
};

// Export it as the root component

/*
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

// mapper pour avoir le isAuthenticated
