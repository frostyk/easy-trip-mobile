import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../../redux/actions";
import firebase from 'firebase'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        firebase.auth().onAuthStateChanged(function (user) {
            let isSignedInValue = !!user;
            this.props.navigation.navigate(isSignedInValue ? 'Main' : 'Auth')
        }.bind(this))
    };


    render() {
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        login: state.loginState,
        logout: state.logoutState,
    };
};

export default connect(mapStateToProps, actions)(AuthLoadingScreen)