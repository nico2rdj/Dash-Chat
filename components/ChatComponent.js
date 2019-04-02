import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";

class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat !"
  });
  state = {
    messages: [],
    idChannel: "",
    isLoadingEarlier: false
  };

  // on let sur écoute le serveur dès qu'il y a un changement
  // on réactualise le store de message
  componentDidMount() {
    this.setState(
      {
        idChannel: this.props.navigation.state.params.idChannel
      },
      () => {
        Fire.shared.onMessages(this.state.idChannel, message =>
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message)
          }))
        );
      }
    );
  }

  onLoadEarlier = () => {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true
      };
    });
    console.log(this.state.isLoadingEarlier);
    this.setState(previousState => {
      return {
        isLoadingEarlier: false
      };
    });
  };

  // quand on quitte le channel on coupe l'écoute
  componentWillUnmount() {
    Fire.shared.off();
  }

  get user() {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
      _idChannel: this.props.navigation.state.params.idChannel
    };
  }

  render() {
    return (
      <GiftedChat
        loadEarlier={true}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        messages={this.state.messages}
        onSend={messages =>
          Fire.shared.sendMessageChannel(this.state.idChannel, messages)
        }
        user={this.user}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default Chat;
