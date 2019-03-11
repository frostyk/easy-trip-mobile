import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {isSignedIn} from "../auth/auth";
import {connect} from "react-redux";
import * as actions from "../redux/actions";

class AuthLoadingScreen extends React.Component {
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

   componentDidUpdate() {
       console.log('Did update');
   }

   componentWillReceiveProps(nextProps, nextContext) {
       console.log('Will receive props');
   }

    componentDidMount() {
       console.log('Did mount');
   }

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
    console.log('AUTH');
    console.log(state);
    return {
        login: state.loginState,
        logout: state.logoutState,
    };
};

export default connect(mapStateToProps, actions)(AuthLoadingScreen)