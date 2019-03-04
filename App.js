import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Import the screens
import Main from "./components/MainComponent";
import Chat from "./components/ChatComponent";
// Import React Navigation
import { createStackNavigator } from "react-navigation";

// Create the navigator
const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat }
});

// Export it as the root component
export default navigator;

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
