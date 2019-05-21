import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SelectLang from "./src/components/Picker.js";
import Login from "./src/components/Login.js";
import Register from "./src/components/Register.js";
import OnlineUsersList from "./src/components/OnlineUsersList.js";
import UserDetail from "./src/components/UserDetail.js";
const Main = createStackNavigator({
  OnlineUsersList: {
    screen: OnlineUsersList
  },
  UserDetail: {
    screen: UserDetail
  }
});
export default createAppContainer(Main);
