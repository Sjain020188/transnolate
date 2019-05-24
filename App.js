import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import Routes from "./Routes";
import RoutesMain from "./RoutesMain";
import OnlineUsersList from "./src/components/OnlineUsersList";
import * as firebase from "firebase";
import ApiKeys from "./utils/ApiKeys";

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
  },
  selectedUser: ""
};

export const saveUser = async data => {
  const user = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone_number: data.phone,
    username: data.username,
    password: data.password
  };
  let a = await axios.post("http://localhost:3000/signup", user);
};

export const validateUser = data => {
  const userAdded = axios.post("http://localhost:3000/login", data);
};

export const getUser = async username => {
  try {
    fetch(`http://localhost:3000/user/${username}`).then(res => res.json());
  } catch (err) {
    return err(err);
  }
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return newState;
    }

    case "SET_SELECTED_USER": {
      const newState = { ...state };
      newState.selectedUser = action.value;

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
    this.state = { online: [], isAuthenticated: false };
    this.socket = io("https://chat-server-shruti.herokuapp.com/");
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticated: !!user });
  };

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <Routes /> */}
          {!this.state.isAuthenticated ? <Routes /> : <RoutesMain />}
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
