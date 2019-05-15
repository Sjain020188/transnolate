import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { getlanguages, saveUser } from "../../App";
import { Header } from "react-native-elements";
import Navbar from "./Navbar";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Register"
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar />
        <View style={{ flex: 2, marginTop: 20 }}>
          <TextInput
            placeholder={"First Name"}
            style={styles.input}
            onChangeText={firstName => this.props.setFirstName({ firstName })}
          />
          <TextInput
            placeholder={"Last Name"}
            style={styles.input}
            onChangeText={lastName => this.props.setLastName({ lastName })}
          />
          <TextInput
            placeholder={"Email Address"}
            style={styles.input}
            onChangeText={email => this.props.setEmail({ email })}
          />
          <TextInput
            placeholder={"Phone Number"}
            style={styles.input}
            onChangeText={phoneNumber =>
              this.props.setPhoneNumber({ phoneNumber })
            }
          />

          <TextInput
            placeholder={"User name"}
            style={styles.input}
            onChangeText={username => this.props.setUsername({ username })}
          />
          <TextInput
            placeholder={"Password"}
            value={this.props.password}
            onChangeText={password => this.props.setPassword({ password })}
            style={styles.input}
          />
          <Button
            title={"Register"}
            style={styles.input}
            onPress={() => {
              saveUser(this.props.userInfo);
              this.props.navigation.navigate("Login");
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
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFirstName: data =>
      dispatch({
        type: "SET_FIRSTNAME",
        value: data.firstName
      }),
    setLastName: data =>
      dispatch({
        type: "SET_LASTNAME",
        value: data.lastName
      }),
    setEmail: data =>
      dispatch({
        type: "SET_EMAIL",
        value: data.email
      }),
    setPhoneNumber: data =>
      dispatch({
        type: "SET_PHONENUMBER",
        value: data.phoneNumber
      }),
    setPassword: data =>
      dispatch({
        type: "SET_PASSWORD",
        value: data.password
      }),
    setUsername: data => {
      dispatch({
        type: "SET_USERNAME",
        value: data.username
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
