import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  YellowBox,
  Image
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import SvgUri from "expo-svg-uri";

import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      idChannel: "",
      dispChannel: null,
      user: null,
      search: ""
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress = (id, name) => {
    this.state.idChannel = id;
    this.props.navigation.navigate("Chat", {
      name: name,
      idChannel: this.state.idChannel,
      user: this.state.user
    });
  };

  onChangeText = name => this.setState({ name });

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  onPressChannel = () => {
    var channel = {
      name: this.state.name,
      user: this.props.auth.userId,
      pseudo: this.props.auth.pseudo
    };

    this.props.auth.db.sendChannel(channel);

    Alert.alert(
      "Nouveau cannal",
      this.state.name,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  searchRequest = text => {
    this.setState(
      {
        search: text,
        dispChannel: this.props.channel.channels.filter(item =>
          item.name.toString().startsWith(text)
        )
      },
      () => {}
    );
  };

  renderHeader = () => {
    return (
      <View>
        <SearchBar
          placeholder="Rechercher un cannal..."
          lightTheme
          round
          value={this.state.search}
          onChangeText={text => this.searchRequest(text)}
        />
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={{
                height: 35,
                borderColor: "gray",
                backgroundColor: "#F8F8FF",
                marginLeft: 10,
                borderRadius: 0
              }}
              onChangeText={text => this.setState({ name: text })}
              value={this.state.text}
              placeholder="Nom de votre channel"
            />
          </View>
          <View style={styles.inputWrap}>
            <Button
              onPress={this.onPressChannel}
              title="Créer un channel"
              color="#20B2AA"
              style={{ borderRadius: "0" }}
            />
          </View>
        </View>
      </View>
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={
              this.state.dispChannel
                ? this.state.dispChannel
                : this.props.channel.channels
            }
            renderItem={({ item }) => (
              <ListItem
                avatar={
                  <SvgUri
                    width="30"
                    height="30"
                    source={{
                      uri:
                        "https://avatars.dicebear.com/v2/male/" +
                        `${item.pseudo}` +
                        ".svg"
                    }}
                  />
                }
                title={`${item.name}`}
                subtitle={
                  "Créateur : " +
                  `${item.pseudo}` +
                  "\n Crée le " +
                  `${item.timestamp}`
                }
                button
                onPress={() => {
                  this.onPress(item._id, item.name);
                }}
              />
            )}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            stickyHeaderIndices={[0]}
            //ListFooterComponent={this.renderFooter}
          />
        </List>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
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

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Main);
