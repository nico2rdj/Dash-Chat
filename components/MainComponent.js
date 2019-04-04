import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
  YellowBox
} from "react-native";
import Fire from "../Fire";
import { List, ListItem, SearchBar } from "react-native-elements";

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
      channels: [],
      user: null
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress = id => {
    this.state.idChannel = id;
    this.props.navigation.navigate("Chat", {
      name: this.state.name,
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

  // on let sur écoute le serveur dès qu'il y a un changement
  // on réactualise le store de message
  componentDidMount() {
    Fire.shared.onChannel(channel => {
      this.setState({
        channels: [...this.state.channels, channel]
      });
    });

    Fire.shared.getUser(Fire.shared.uid, user => {
      this.setState(
        {
          user: user
        },
        () => {
          console.log("main", this.state.user);
        }
      );
    });

    //console.log("pseudo: " + this.state.user.values());
  }

  componentDidUpdate() {
    if (this.state.user) console.log("main", this.state.user["pseudo"]);
  }

  onPressChannel = () => {
    var pseudo = JSON.stringify(this.state.user["pseudo"]);
    pseudo = pseudo.substring(1, pseudo.length - 1);
    console.log("pseudo:::::: ", pseudo);
    var channel = {
      name: this.state.name,
      user: Fire.shared.uid,
      pseudo: pseudo
    };

    Fire.shared.sendChannel(channel);
    Alert.alert(
      "Nouveau cannal",
      Fire.shared.email,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  renderHeader = () => {
    return (
      <View>
        <SearchBar placeholder="Rechercher un cannal..." lightTheme round />
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
        {/*
        <Text style={styles.title}>Rentrez le nom d'un canal</Text>
        <TextInput
          onChangeText={this.onChangeText}
          style={styles.nameInput}
          placeholder="Creed"
          value={this.state.name}
        />
        *

        <TouchableOpacity onPress={this.onPressChannel}>
          <Text style={styles.buttonText}>Créer un channel</Text>
        </TouchableOpacity>

        {/* for loop maps channel  */}

        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.channels}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.name}`}
                subtitle={
                  "Créateur : " +
                  `${item.pseudo}` +
                  "\n Crée le " +
                  `${item.timestamp}`
                }
                button
                onPress={() => {
                  this.onPress(item._id);
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

        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>
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

export default Main;
