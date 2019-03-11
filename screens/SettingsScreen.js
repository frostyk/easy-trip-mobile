import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";

import {connect} from "react-redux";
import * as actions from "../redux/actions";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
        <ScrollView style={styles.container}>
          <Button
              title={'Logout'}
              onPress={this._signInAsync}
          />
        </ScrollView>
    );
  }

  _signInAsync = async () => {
    await this.props.login({
      password: "admin",
      rememberMe: false,
      username: "admin"
    });
  }
}


export default connect(null, actions)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
