import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { ListItem, SearchBar } from "react-native-elements";
import Navbar from "./Navbar";

const io = require("socket.io-client");

class OnlineUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { online: [] };
    this.socket = io("https://chat-server-shruti.herokuapp.com/");
  }

  static navigationOptions = {
    title: "OnlineUsersList"
  };

  componentDidMount = async () => {
    this.socket.on("server message", message => {
      let o;
      this.socket.emit("new user", this.props.loginInfo.username);
      this.socket.on("users", data => {
        o = data;
        console.log("online users", o);
        this.setState({ online: o });
      });
      // this.setState({ online: o });
      // this.socket.on("users", function(data) {
      //   this.setState({ online: Object.keys(data) });
      //   console.log("online users", Object.keys(data));
      // });

      // this.setState({ online: JSON.parse(message) });
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

  renderOnline = () => {
    return (
      <View>
        <Text>Online</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Navbar />
        <Text style={styles.text}>Hello, {this.props.loginInfo.username}</Text>
        <FlatList
          style={styles.flatList}
          data={this.state.online}
          renderItem={({ item }) => (
            <View style={styles.userList}>
              <View style={styles.circle} />
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#000",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: 5,
    width: "100%"
  },
  flatList: {
    width: "100%",
    fontSize: 30,
    flexDirection: "row",
    paddingTop: 80,
    flex: 2
  },
  userList: {
    fontSize: 30,
    paddingLeft: 40,
    width: "100%",
    flexDirection: "row"
  },
  text: {
    fontSize: 20
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: "green",
    marginRight: 20,
    marginTop: 10
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
    getUsers: () =>
      dispatch({
        type: "GET_ONLINE_USERS"
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineUsersList);
