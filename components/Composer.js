/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from "prop-types";
import React from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  Button,
  ScrollView
} from "react-native";
import EmojiSelector from "react-native-emoji-selector";

import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER } from "./Constant";
import Color from "./Color";

const InputAccessoryView = require("InputAccessoryView");

export default class Composer extends React.Component {
  onContentSizeChange(e) {
    const { contentSize } = e.nativeEvent;

    // Support earlier versions of React Native on Android.
    if (!contentSize) return;

    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isEmo: false
    };
  }

  onChangeText(text) {
    this.props.onTextChanged(text);
  }

  EmojisMenu = () => {
    return (
      <View style={{ height: 80, top: 0 }}>
        <EmojiSelector
          onEmojiSelected={emoji => console.log(emoji)}
          showSearchBar={false}
          style={{ flex: 1, flexWrap: "wrap" }}
        />
      </View>
    );
  };

  render() {
    const inputAccessoryViewID = "uniqueID";
    return (
      <View>
        <TextInput
          testID={this.props.placeholder}
          accessible
          accessibilityLabel={this.props.placeholder}
          placeholder="Entrez votre message..."
          placeholderTextColor={this.props.placeholderTextColor}
          multiline={this.props.multiline}
          onChange={e => this.onContentSizeChange(e)}
          onContentSizeChange={e => this.onContentSizeChange(e)}
          onChangeText={text => this.onChangeText(text)}
          style={[
            styles.textInput,

            this.props.textInputStyle,
            { height: this.props.composerHeight }
          ]}
          autoFocus={this.props.textInputAutoFocus}
          value={this.props.text}
          enablesReturnKeyAutomatically
          underlineColorAndroid="transparent"
          keyboardAppearance={this.props.keyboardAppearance}
          {...this.props.textInputProps}
        />
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3
    })
  },
  title: {
    // 4.
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset
  },
  buttonText: {
    // 5.
    marginLeft: offset,
    marginRight: offset,
    fontSize: offset,
    borderColor: "#111111",
    borderWidth: 1
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1
  },

  row: {
    flex: 1,
    flexDirection: "row"
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    borderRadius: 0
  },
  inputdate: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  }
});

Composer.defaultProps = {
  composerHeight: MIN_COMPOSER_HEIGHT,
  text: "",
  placeholderTextColor: Color.defaultProps,
  placeholder: DEFAULT_PLACEHOLDER,
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  textInputAutoFocus: false,
  keyboardAppearance: "default",
  onTextChanged: () => {},
  onInputSizeChanged: () => {}
};

Composer.propTypes = {
  composerHeight: PropTypes.number,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  multiline: PropTypes.bool,
  textInputStyle: TextInput.propTypes.style,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string
};
