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

// Import les screens
import Main from "../components/MainComponent";
import Chat from "../components/ChatComponent";

import {
  createStackNavigator,
  createSwitchNavigator,
  createTabNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";

import SignIn from "../components/SignInComponent";
import SignUp from "../components/SignUpComponent";

import SvgUri from "expo-svg-uri";

// Create the navigator
const mapStateToProps = state => {
  return state;
};

// utilisateur connecté
export const Signed = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      title: "Bienvenue " + navigation.getParam("main_title"),

      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require("../menu_p.png")}
            style={{
              marginLeft: 15,
              height: 30,
              width: 30,
              tintColor: "black"
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 20, marginBottom: 10 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <SvgUri
            width="50"
            height="50"
            source={{
              uri:
                "https://avatars.dicebear.com/v2/male/" +
                navigation.getParam("main_title") +
                ".svg"
            }}
          />
        </TouchableOpacity>
      )
    })
  },
  Chat: { screen: Chat }
});

// utilisateur deconnecté
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

// drawer menu custom
const customNavigator = props => {
  return (
    <Container>
      <Header
        style={{
          height: 150,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "black",
          borderBottomColor: "white",
          borderBottomWidth: 1
        }}
      >
        <Body
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "black"
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60
            }}
            source={require("../messenger.png")}
          />
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 1
            }}
          />
          <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
            Dash Chat
          </Text>
        </Body>
      </Header>
      <Content style={{ backgroundColor: "black" }}>
        <DrawerItems {...props} />
      </Content>
    </Container>
  );
};

// stack global
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

// drawer menu
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
