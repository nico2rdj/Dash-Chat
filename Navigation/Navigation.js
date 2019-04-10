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
import { Container, Content, Header, Left, Body } from "native-base";

// Import the screens
import Main from "../components/MainComponent";
import Chat from "../components/ChatComponent";
// Import React Navigation
import {
  createStackNavigator,
  createSwitchNavigator,
  createTabNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerItems
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

      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "#ff990a",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require("../menu_p.png")}
            style={{ marginLeft: 15, height: 30, width: 30 }}
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

SignedOut.navigationOptions = ({ navigation }) => {
  let drawerLockMode = "locked-closed";

  return {
    drawerLockMode
  };
};

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
const customNavigator = props => {
  return (
    <Container>
      <Header
        style={{
          height: 150,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "white"
        }}
      >
        <Body
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "white"
          }}
        >
          <Image
            style={{
              width: 200,
              height: 50
            }}
            source={require("../dashChat.png")}
          />
          <Text />
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
    </Container>
  );
};

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

export const DrawerStack = createDrawerNavigator(
  {
    Acceuil: {
      screen: Signed,
      navigationOptions: {
        labelStyle: {
          fontFamily: "SomeFont",
          color: "#ff990a"
        },
        drawerLabel: "Acceuil",
        drawerIcon: () => (
          <Image
            source={require("../home.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        )
      }
    },
    Deconnexion: {
      screen: SignedOut,
      navigationOptions: {
        tabBarVisible: false,
        labelStyle: {
          fontFamily: "SomeFont",
          color: "#ff990a"
        },
        drawerLabel: "Deconnexion",
        drawerIcon: () => (
          <Image
            source={require("../logout.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        )
      }
    }
  },
  {
    contentComponent: customNavigator,
    contentOptions: {
      activeTintColor: "#ff990a",
      inactiveTintColor: "#ff990a"
    }
  }
);

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
