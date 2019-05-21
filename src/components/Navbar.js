import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { getlanguages } from "../../App";
import { Header } from "react-native-elements";
import { getMaxListeners } from "cluster";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          style={{ height: 20 }}
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "TRANS-NO-LATE", style: { color: "#fff" } }}
          rightComponent={{ icon: "logout", color: "#fff" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 0
  }
});

const mapStateToProps = state => {
  return {
    languages: state.languages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLanguages: () => dispatch(getlanguages())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

getMaxListeners.com
