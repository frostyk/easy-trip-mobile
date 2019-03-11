import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from "react-native-elements";

import {connect} from "react-redux";
import * as actions from "../../redux/actions";
import Typography from '../../styles/Typography'
import Inputs from '../../styles/Inputs'
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import Buttons from "../../styles/Buttons";

class SignInScreen extends React.Component {
    static navigationOptions = {
        title: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            loginInput: '',
            passwordInput: ''
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Text style={[Typography.largeTitle, {alignSelf: 'flex-start'}]}>Sign In</Text>
                        <View style={styles.inputs}>
                            <Input
                                inputContainerStyle={Inputs.rounded.inputContainerStyle}
                                inputStyle={Inputs.rounded.inputStyle}
                                placeholder='E-mail'
                                onChangeText={(text) => this.setState({loginInput: text})}
                            />
                            <Input
                                inputContainerStyle={Inputs.rounded.inputContainerStyle}
                                inputStyle={Inputs.rounded.inputStyle}
                                placeholder='Password'
                                onChangeText={(text) => this.setState({passwordInput: text})}
                                secureTextEntry={true}
                            />

                            <Button title={'Log In'} titleStyle={Buttons.rounded.title}
                                    onPress={this._onSignInPress}
                                    buttonStyle={[Buttons.rounded.solidStyle, {width: widthPercentageToDP('60%')}]}/>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    componentDidUpdate() {
        if (this.props.loginState.isSuccessful) {
            this.props.navigation.navigate('AuthLoading');
        }
    }

    _onSignInPress = () => {
        this.props.login({
            password: this.state.passwordInput,
            rememberMe: false,
            username: this.state.loginInput
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
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        width: widthPercentageToDP('90%')
    },
    inputs: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: heightPercentageToDP('20%'),
        marginTop: heightPercentageToDP('10%'),
        width: widthPercentageToDP('75%')
    }
});
