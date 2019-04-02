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
  Button
} from "react-native";
import Fire from "../Fire";
import { List, ListItem, SearchBar } from "react-native-elements";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      idChannel: "",
      channels: []
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress = id => {
    this.state.idChannel = id;
    this.props.navigation.navigate("Chat", {
      name: this.state.name,
      idChannel: this.state.idChannel
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
      console.log(channel);
      console.log(this.state.channels);
    });
    console.log(this.state.channels);
  }

  onPressChannel = () => {
    var channel = {
      name: this.state.name,
      user: Fire.shared.uid
    };
    Fire.shared.sendChannel(channel);
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
                backgroundColor: "#F8F8FF"
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
                subtitle={"haha"}
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
    marginBottom: 10
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
