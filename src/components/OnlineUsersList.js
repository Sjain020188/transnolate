import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import * as firebase from "firebase";

const io = require("socket.io-client");

class OnlineUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { online: [], loading: true };
    this.socket = io("https://chat-server-shruti.herokuapp.com/");
  }

  static navigationOptions = {
    title: "OnlineUsersList"
  };

  componentDidMount = async () => {
    this.socket.on("server message", message => {
      this.socket.emit("new user", this.props.loginInfo.username);
      this.socket.on("users", data => {
        this.setState({ online: data, loading: false });
      });
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "20%"
        }}
      />
    );
  };

  onLogoutPress = () => {
    this.socket.disconnect();
    firebase.auth().signOut();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logout}>
          <TouchableHighlight
            onPress={() => {
              this.onLogoutPress();
            }}
          >
            <Icon name="sign-out" size={30} color="red" />
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>Hello, {this.props.loginInfo.username}</Text>

        <ActivityIndicator
          animating={this.state.loading}
          size="large"
          color="#0000ff"
        />
        <FlatList
          style={styles.flatList}
          data={this.state.online}
          renderItem={({ item }) => (
            <View style={styles.userList}>
              <View style={styles.circle} />
              <Button
                style={styles.text}
                onPress={() => {
                  this.props.setUserDetail({ value: item });
                  this.props.navigation.navigate("UserDetail");
                }}
                title={item}
                key="2"
              />
            </View>
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "red",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: 5,
    width: "100%"
  },
  flatList: {
    width: "100%",
    fontSize: 30,
    flexDirection: "row",
    flex: 2
  },
  userList: {
    fontSize: 30,
    paddingLeft: 40,
    width: "100%",
    flexDirection: "row",
    alignSelf: "stretch"
  },
  text: {
    fontSize: 20,
    marginTop: 50,
    color: "red",
    marginLeft: 16
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: "green",
    marginRight: 20,
    marginTop: 10
  },
  input: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  logout: {
    marginTop: 20,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginRight: 10
  }
});

const mapStateToProps = state => {
  return {
    onlineUsers: state.onlineUsers,
    loginInfo: state.loginInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDetail: data =>
      dispatch({
        type: "SET_SELECTED_USER",
        value: data.value
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineUsersList);
