import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SelectLang from "./src/components/Picker.js";
import Login from "./src/components/Login.js";
import Register from "./src/components/Register.js";
import OnlineUsersList from "./src/components/OnlineUsersList.js";
const Project = createStackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  SelectLang: {
    screen: SelectLang
  },
  OnlineUsersList: {
    screen: OnlineUsersList
  }
});
export default createAppContainer(Project);
