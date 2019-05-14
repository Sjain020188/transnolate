import React from "react";
import { StyleSheet, Text, View, Picker, Button } from "react-native";
import { connect } from "react-redux";
import { getlanguages } from "../../App";
import Navbar from "./Navbar";

class SelectLang extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "SelectLang"
  };

  //   componentDidMount = () => {
  //     this.props.loadLanguages();
  //   };
  render() {
    return (
      <View style={styles.container}>
        <Navbar />
        <Text>Choose the language you need help with</Text>
        <Picker
          selectedValue={this.props.selectedLanguage}
          onValueChange={value => this.props.updateLang({ value })}
          style={{ height: 50, width: 500, flex: 2 }}
        >
          {this.props.languages.map((language, index) => {
            return (
              <Picker.Item label={language} value={language} key={index} />
            );
          })}
        </Picker>
        <Button
          title={"Submit"}
          style={styles.input}
          onPress={() => this.props.navigation.navigate("OnlineUsersList")}
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
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    languages: state.languages,
    selectedLanguage: state.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLanguages: () => dispatch(getlanguages()),
    updateLang: value =>
      dispatch({
        type: "UPDATE_LANGUAGE",
        language: value.value
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectLang);
