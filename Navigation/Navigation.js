import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Icon,
  TouchableOpacity
} from "react-native";

// Import the screens
import Main from "../components/MainComponent";
import Chat from "../components/ChatComponent";
// Import React Navigation
import {
  createStackNavigator,
  createSwitchNavigator,
  createTabNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";

import { fetchUser } from "../Store/actions";
import { connect } from "react-redux";
import SignIn from "../components/SignInComponent";
import SignUp from "../components/SignUpComponent";

// Create the navigator
const mapStateToProps = state => {
  return state;
};

export const Signed = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      title: "Bienvenue " + navigation.getParam("main_title"),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require("../menu-button.png")}
            style={{ marginLeft: 15, height: 40, width: 40 }}
          />
        </TouchableOpacity>
      )
    })
  },
  Chat: { screen: Chat }
});

export const SignedOut = createBottomTabNavigator(
  {
    SignIn: {
      screen: SignIn,

      navigationOptions: {
        title: "Connexion"
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Inscription"
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      labelStyle: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 15
      },
      style: {
        backgroundColor: "black"
      }
    }
  }
);

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
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: DrawerStack
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          title: "Déconnecté"
        }
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};

export const DrawerStack = createDrawerNavigator({
  screen1: Signed
});

// export const DrawerNavigation = createStackNavigator(
//   {
//     DrawerStack: { screen: DrawerStack }
//   },
//   {
//     headerMode: "float",
//     navigationOptions: ({ navigation }) => ({
//       headerStyle: { backgroundColor: "green" },
//       title: "Logged In to your app!",
//       headerLeft: (
//         <Text onPress={() => navigation.navigate("DrawerOpen")}>Menu</Text>
//       )
//     })
//   }
// );

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
  },
  icon: {
    width: 24,
    height: 24
  },
  absoluteView: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  }
});

// mapper pour avoir le isAuthenticated
