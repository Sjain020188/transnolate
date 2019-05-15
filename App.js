import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./src/components/Navbar";
import SelectLang from "./src/components/Picker.js";
import OnlineUsersList from "./src/components/OnlineUsersList.js";
import Login from "./src/components/Login.js";
import Register from "./src/components/Register.js";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import Routes from "./Routes";

const io = require("socket.io-client");

const initialState = {
  languages: ["English", "Japanese", "Hindi", "French", "German"],
  selectedLanguage: "",
  onlineUsers: [],
  loginInfo: {
    username: "",
    password: ""
  },
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: ""
  }
};

export const saveUser = data => {
  const user = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone_number: data.phone,
    username: data.username,
    password: data.password
  };
  axios.post("http://localhost:9000/users", user);
};

export const validateUser = data => {
  console.log("bfdjs");
  axios.post("http://localhost:9000/login");
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS": {
      const newState = { ...state };
      newState.onlineUsers = [
        ...newState.onlineUsers,
        { name: "Shruti", phone: "03212" },
        { name: "Rohit", phone: "03212" }
      ];

      return newState;
    }

    case "SET_PASSWORD": {
      const newState = { ...state };
      newState.userInfo.password = action.value;
      return newState;
    }

    case "SET_FIRSTNAME": {
      const newState = { ...state };
      newState.userInfo.firstName = action.value;
      return newState;
    }

    case "SET_LASTNAME": {
      const newState = { ...state };
      newState.userInfo.lastName = action.value;
      return newState;
    }

    case "SET_EMAIL": {
      const newState = { ...state };
      newState.userInfo.email = action.value;
      return newState;
    }

    case "SET_PHONENUMBER": {
      const newState = { ...state };
      newState.userInfo.phone = action.value;
      return newState;
    }
    case "SET_USERNAME": {
      const newState = { ...state };
      newState.userInfo.username = action.value;
      return newState;
    }

    case "SET_LOGIN_USERNAME": {
      const newState = { ...state };
      newState.loginInfo.username = action.value;
      return newState;
    }

    case "SET_LOGIN_PASSWORD": {
      const newState = { ...state };
      newState.loginInfo.password = action.value;
      return newState;
    }

    case "GET_ONLINE_USERS": {
      const newState = { ...state };
      newState.onlineUsers = action.value;
      console.log("online Users", newState.onlineUsers);
      return newState;
    }

    default:
      return state;
  }
};
const store = createStore(appReducer, initialState, applyMiddleware(thunk));
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { online: [] };
    this.socket = io("http://localhost:3000/");
  }

  componentDidMount = () => {
    this.socket.on("server message", message => {
      this.setState({ online: JSON.parse(message) });
      console.log(this.state.online);
      store.dispatch({ type: "GET_ONLINE_USERS", value: this.state.online });
    });
  };
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Routes />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column"
  }
});
