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
    fetch(`http://localhost:3000/users/${this.props.selectedUser}`)
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.setState({ userInfo: result[0] });
      });

    fetch(`http://localhost:3000/reviews/${this.props.selectedUser}`)
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
    axios.post("http://localhost:3000/users/review", {
      username: this.props.selectedUser,
      review: this.state.newReview
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
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

        <View style={{ marginTop: 50, flex: 1 }}>
          <Button
            title={"Logout"}
            style={styles.input}
            onPress={() => {
              this.onLogoutPress();
            }}
          />
          <View>
            <Card title="USER DETAILS">
              <Text>Name : {this.state.userInfo.first_name}</Text>
              <Text>Email : {this.state.userInfo.email}</Text>
              <Text>Phone :{this.state.userInfo.phone_number}</Text>
              <Text>User Name : {this.state.userInfo.username}</Text>
            </Card>
          </View>
          <ScrollView
            horizontal={true}
            style={{ flex: 1, flexDirection: "row" }}
          >
            {this.state.reviews.map((item, index) => {
              return (
                <Card
                  title="REVIEW"
                  key={index}
                  containerStyle={{
                    alignSelf: "stretch",
                    width: 350,
                    height: 200
                  }}
                >
                  <Text styles={{ width: 100 }}>{item.review.trim()}</Text>
                </Card>
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
            <Text>Add review</Text>
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
    backgroundColor: "#ecf0f1"
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
    backgroundColor: "#0080ff",
    borderRadius: 2,
    padding: 10
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
