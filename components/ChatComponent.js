import React, { Component } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import Composer from "./Composer";

import Fire from "../Fire";

class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat !"
  });

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      idChannel: "",
      isLoadingEarlier: false,
      size: 10,
      pseudo: "",
      test: ""
    };
  }
  // on let sur écoute le serveur dès qu'il y a un changement
  // on réactualise le store de message
  componentDidMount() {
    this.setState(
      {
        idChannel: this.props.navigation.state.params.idChannel
      },
      () => {
        Fire.shared.onMessagesRefresh(
          this.state.idChannel,
          message =>
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, message)
            })),
          this.state.size
        );
      }
    );
    Fire.shared.getUser(Fire.shared.uid, user => {
      this.setState(
        {
          user: user
        },
        () => {
          var pseudo = JSON.stringify(this.state.user["pseudo"]);
          pseudo = pseudo.substring(1, pseudo.length - 1);
          this.setState({
            pseudo: pseudo
          });
        }
      );
    });
  }

  onLoadEarlier = () => {
    console.log("chargement");

    this.setState(
      {
        size: this.state.size + 5,
        messages: []
      },
      () => {
        Fire.shared.onMessagesRefresh(
          this.state.idChannel,
          message =>
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, message)
            })),
          this.state.size
        );
      }
    );

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
      name: this.state.pseudo,
      _id: Fire.shared.uid
      //_idChannel: this.props.navigation.state.params.idChannel
    };
  }

  // tinput = () => {
  //   return (
  //     <View>
  //       <TouchableOpacity activeOpacity={0.6} />
  //       <TextInput
  //         placeholder="wassup"
  //         returnKeyType={"send"}
  //         onChangeText={text => this.setState({ test: text })}
  //         value={this.state.text}
  //         blurOnSubmit={false}
  //         ref={"chatInputRef"}
  //       />
  //       <Button
  //         style={{ fontSize: 20, color: "green" }}
  //         styleDisabled={{ color: "red" }}
  //         onPress={() => this.props.onSend}
  //         title="Envoyer"
  //       >
  //         Press Me
  //       </Button>
  //     </View>
  //   );
  // };

  tinput = props => {
    return <Composer {...props} />;
  };

  renderInputToolbar = props => {
    // Here you will return your custom InputToolbar.js file you copied before and include with your stylings, edits.

    return (
      // <View>
      //   <TouchableOpacity activeOpacity={0.6} />
      //   <TextInput
      //     placeholder="wassup"
      //     returnKeyType={"send"}
      //     onChangeText={text => this.setState({ test: text })}
      //     value={this.state.text}
      //     blurOnSubmit={false}
      //     ref={"chatInputRef"}
      //   />
      //   <Button
      //     style={{ fontSize: 20, color: "green" }}
      //     styleDisabled={{ color: "red" }}
      //     onPress={() => this.props.onSend}
      //     title="Envoyer"
      //   >
      //     Press Me
      //   </Button>
      // </View>

      <InputToolbar
        {...props}
        renderAccessory={this.tinput}
        //containerStyle={{ borderTopWidth: 1.5, borderTopColor: "#333" }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          loadEarlier={true}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          messages={this.state.messages}
          onSend={messages =>
            Fire.shared.sendMessageChannel(this.state.idChannel, messages)
          }
          user={this.user}
          placeholder="Taper votre message"
          renderInputToolbar={this.renderInputToolbar}
          showAvatarForEveryMessage={true}
        />
        <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={80}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Chat;
