import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View>
        <TextInput
          onChangeText={this.onChangeText}
          style={styles.nameInput}
          placeholder="Creed"
          value={this.state.name}
        />
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1
  }
});

export default Main;
