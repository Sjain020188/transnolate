import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { ListItem, SearchBar } from "react-native-elements";
import Navbar from "./Navbar";

const onlineUsers = [
  { name: "Shruti", phone: "03212" },
  { name: "Rohit", phone: "03212" }
];

class OnlineUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUsers();
  }

  static navigationOptions = {
    title: "OnlineUsersList"
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
        <FlatList
          style={styles.flatList}
          data={[
            { name: "Shruti", phone: "03212" },
            { name: "Rohit", phone: "03212" }
          ]}
          renderItem={({ item }) => (
            <View style={styles.userList}>
              <View style={styles.circle} />
              <Text style={styles.text}>{item.name}</Text>
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
    onlineUsers: state.onlineUsers
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
