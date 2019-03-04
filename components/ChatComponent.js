import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat !"
  });
  state = {
    messages: []
  };
  render() {
    return <GiftedChat messages={this.state.message} />;
  }
}

const styles = StyleSheet.create({});

export default Chat;
