import React from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import {isSignedIn} from "../auth/auth";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
      try {
          const isSignedInValue = await isSignedIn();
          this.props.navigation.navigate(isSignedInValue ? 'Main' : 'Auth')
      } catch (e) {
          console.log(e);
      }
  };

  render() {
    return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
    );
  }
}
