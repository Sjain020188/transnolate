import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { getlanguages, validateUser } from "../../App";
import { Header } from "react-native-elements";
import Navbar from "./Navbar";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Login"
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar />
        <Text style={{ flex: 1, paddingTop: 40, fontSize: 30 }}>
          Welcome to ChatsApp....
        </Text>
        <View style={{ flex: 2 }}>
          <TextInput
            placeholder={"Username"}
            value={this.props.username}
            onChangeText={username => this.props.setUserName({ username })}
            style={styles.input}
          />
          <TextInput
            placeholder={"Password"}
            secureTextEntry={true}
            value={this.props.password}
            onChangeText={password => this.props.setPassword({ password })}
            style={styles.input}
          />

          <Button
            title={"Login"}
            style={styles.input}
            onPress={() => {
              this.props.navigation.navigate("OnlineUsersList");
            }}
          />

          <Button
            title={"New User? Register"}
            style={styles.input}
            onPress={() => this.props.navigation.navigate("Register")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    loginInfo: state.loginInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserName: data =>
      dispatch({
        type: "SET_LOGIN_USERNAME",
        value: data.username
      }),
    setPassword: () =>
      dispatch({
        type: "SET_LOGIN_PASSWORD"
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
