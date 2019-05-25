import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Modal,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Card } from "react-native-elements";
import axios from "axios";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        username: ""
      },
      newReview: "",
      reviews: [],
      modalVisible: false
    };
  }

  static navigationOptions = {
    title: "UserDetail"
  };

  componentDidMount = async () => {
    fetch(
      `https://chat-server-shruti.herokuapp.com/users/${
        this.props.selectedUser
      }`
    )
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.setState({ userInfo: result[0] });
      });

    fetch(
      `https://chat-server-shruti.herokuapp.com/reviews/${
        this.props.selectedUser
      }`
    )
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.setState({ reviews: result });
      });
  };

  onLogoutPress = () => {
    firebase.auth().signOut();
  };

  addReview() {
    axios.post("https://chat-server-shruti.herokuapp.com/users/review", {
      username: this.props.selectedUser,
      review: this.state.newReview
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logout}>
          <TouchableHighlight
            onPress={() => {
              this.onLogoutPress();
            }}
          >
            <Icon name="sign-out" size={30} color="#E91E63" />
          </TouchableHighlight>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          style={styles.modal}
          visible={this.state.modalVisible}
          onRequestClose={() => alert.alert("modal is closed")}
        >
          <View style={{ flex: 1, marginTop: 20 }}>
            <View>
              <TextInput
                placeholder={"Review"}
                value={this.state.review}
                onChangeText={review => this.setState({ newReview: review })}
                style={styles.inputModal}
                multiline={true}
                numberOfLines={10}
              />
              <Button
                title={"Submit"}
                style={styles.input}
                onPress={() => {
                  this.addReview();
                  this.setState({ modalVisible: false });
                }}
              />
            </View>
            <View />
          </View>
        </Modal>

        <View style={{ flex: 2 }}>
          <Card title="USER DETAILS">
            <View style={styles.inputContainer}>
              <Icon
                name="address-card"
                size={30}
                color="#E91E63"
                style={styles.inputIcon}
              />

              <Text style={styles.userDetail}>
                {this.state.userInfo.first_name}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="envelope"
                size={30}
                color="#E91E63"
                style={styles.inputIcon}
              />

              <Text style={styles.userDetail}>{this.state.userInfo.email}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="phone"
                size={30}
                color="#E91E63"
                style={styles.inputIcon}
              />

              <Text style={styles.userDetail}>
                {this.state.userInfo.phone_number}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="user"
                size={30}
                color="#E91E63"
                style={styles.inputIcon}
              />

              <Text style={styles.userDetail}>
                {this.state.userInfo.username}
              </Text>
            </View>
          </Card>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 20,
              color: "#673AB7",
              fontWeight: "400",
              marginBottom: 10
            }}
          >
            Reviews
          </Text>
          <ScrollView
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "#fff",
              width: 300
            }}
          >
            {this.state.reviews.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={{ margin: 10 }}>{item.review.trim()}</Text>
                  <View
                    style={{
                      height: 1,
                      width: "86%",
                      backgroundColor: "#CED0CE",
                      marginLeft: "20%"
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Text style={{ color: "#ffffff" }}>Add review</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC107"
  },
  inputModal: {
    height: 60,
    marginLeft: 16,
    marginRight: 16,
    borderColor: "#000",
    borderWidth: 2,
    marginTop: 150
  },
  button: {
    backgroundColor: "#E91E63",
    borderRadius: 2,
    padding: 10
  },
  logout: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 20
  },
  modal: {
    backgroundColor: "#FFC107"
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  userDetail: {
    fontSize: 20,
    fontWeight: "200"
  }
});

const mapStateToProps = state => {
  return {
    selectedUser: state.selectedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
