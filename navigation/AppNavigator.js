import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";
import AuthStack from "./AuthStack";

export default createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack
}, {
    initialRouteName: 'AuthLoading'
}));