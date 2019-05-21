import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { getlanguages, validateUser } from "../../App";
import * as firebase from "firebase";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Login"
  };

  onLoginPress = () => {
    console.log(this.props.loginInfo);
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.props.loginInfo.username,
        this.props.loginInfo.password
      )
      .then(
        () => {
          Alert.alert("logged in successfully");
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ flex: 1, paddingTop: 40, fontSize: 30 }}>
          Welcome to ChatsApp....
        </Text>
        <View style={{ flex: 2 }}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/male-user/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              placeholder={"Email Address"}
              value={this.props.username}
              onChangeText={username => this.props.setUserName({ username })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              placeholder={"Password"}
              secureTextEntry={true}
              value={this.props.password}
              onChangeText={password => this.props.setPassword({ password })}
              style={styles.input}
            />
          </View>

          <Button
            title={"Login"}
            style={styles.input}
            onPress={() => {
              this.onLoginPress();

              // validateUser(this.props.loginInfo);
              // this.props.navigation.navigate("OnlineUsersList");
            }}
          />

          <Button
            title={"New User? Register"}
            style={styles.input}
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
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
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
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
    setPassword: data =>
      dispatch({
        type: "SET_LOGIN_PASSWORD",
        value: data.password
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
