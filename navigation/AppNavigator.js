import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";
import AuthStack from "./AuthStack";
import * as firebase from 'firebase'
import {firebaseConfig} from "../config/config";

firebase.initializeApp(firebaseConfig);

export default createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack
}, {
    initialRouteName: 'AuthLoading'
}));