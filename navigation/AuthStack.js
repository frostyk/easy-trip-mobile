import React from 'react';
import {createStackNavigator} from 'react-navigation';
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

const AuthStack = createStackNavigator({
    Auth: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen
});



export default AuthStack;