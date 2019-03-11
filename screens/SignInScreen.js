import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button} from "react-native-elements";

import {connect} from "react-redux";
import * as actions from "../redux/actions";

class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'SignIn',
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <Button
                        title={'SignIn'}
                        onPress={this._signInAsync}
                    />
                </View>
            </SafeAreaView>
        );
    }

    componentDidUpdate() {
        if (this.props.loginState.isSuccessful) {
            this.props.navigation.navigate('AuthLoading');
        }
    }

    _signInAsync = () => {
        this.props.login({
            password: "admin",
            rememberMe: false,
            username: "admin"
        });
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loginState: state.loginState
    };
};


export default connect(mapStateToProps, actions)(SignInScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
