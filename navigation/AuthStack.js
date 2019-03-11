import React from 'react';
import {createStackNavigator} from 'react-navigation';
import WelcomeScreen from "../screens/auth/WelcomeScreen";

const AuthStack = createStackNavigator({
    Auth: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen
});



export default AuthStack;