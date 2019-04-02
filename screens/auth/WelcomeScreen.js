import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from "react-native-elements";
import Typography from '../../styles/Typography'
import Buttons from '../../styles/Buttons'
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";

export default class WelcomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <Text style={Typography.h1}>Easy Trip</Text>
                    <View style={styles.buttons}>
                        <Button title={'Log In'} type={'outline'} titleStyle={Buttons.rounded.title}
                                onPress={this._onSignInPress}
                                buttonStyle={[Buttons.rounded.outlineStyle, {width: widthPercentageToDP('75%')}]}/>
                        <Button title={'Sign Up'} titleStyle={Buttons.rounded.title}
                                onPress={this._onSignUpPress}
                                buttonStyle={[Buttons.rounded.solidStyle, {width: widthPercentageToDP('75%')}]}/>
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
        this.props.navigation.navigate('SignIn');
    }

    _onSignUpPress = () => {
        this.props.navigation.navigate('SignUp');
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        marginTop: heightPercentageToDP('3%'),
        height: heightPercentageToDP('15%'),
        justifyContent: 'space-between'
    }
});
