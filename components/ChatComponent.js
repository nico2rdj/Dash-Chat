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
import { connect } from "react-redux";
import SvgUri from "expo-svg-uri";

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

  componentDidMount() {
    this.setState(
      {
        idChannel: this.props.navigation.state.params.idChannel
      },
      () => {
        this.props.auth.db.onMessagesRefresh(
          this.state.idChannel,
          message =>
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, message)
            })),
          this.state.size
        );
      }
    );
  }

  onLoadEarlier = () => {
    this.setState(
      {
        size: this.state.size + 5,
        messages: []
      },
      () => {
        this.props.auth.db.onMessagesRefresh(
          this.state.idChannel,
          message =>
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, message)
            })),
          this.state.size
        );
      }
    );

    this.setState(
      previousState => {
        return {
          isLoadingEarlier: true
        };
      },
      () => {
        this.setState(previousState => {
          return {
            isLoadingEarlier: false
          };
        });
      }
    );
  };

  // quand on quitte le channel on coupe l'écoute
  componentWillUnmount() {
    this.props.auth.db.off();
  }

  get user() {
    return {
      name: this.props.auth.pseudo,
      _id: this.props.auth.userId,
      avatar:
        "https://avatars.dicebear.com/v2/male/" +
        this.props.auth.pseudo +
        ".svg"
    };
  }

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
        renderComposer={this.tinput}

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
            this.props.auth.db.sendMessageChannel(
              this.state.idChannel,
              messages
            )
          }
          user={this.user}
          placeholder="Taper votre message"
          showAvatarForEveryMessage={true}
          renderAvatar={item => (
            <SvgUri
              source={{ uri: item.currentMessage.user.avatar }}
              width={24}
              height={24}
            />
          )}
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

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Chat);
