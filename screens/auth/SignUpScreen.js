import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Text, Input, Button} from "react-native-elements";

import {connect} from "react-redux";
import * as actions from "../../redux/actions";
import Typography from '../../styles/Typography'
import Inputs from '../../styles/Inputs'
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import Buttons from "../../styles/Buttons";
import {iOSColors} from "react-native-typography";

class SignUpScreen extends React.Component {
    static navigationOptions = {
        title: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            firstName: '',
            lastName: '',
            password: '',
            langKey: 'en'
        }
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Text style={[Typography.h1, {alignSelf: 'flex-start'}]}>Sign In</Text>
                        <View style={styles.inputs}>
                            <Input
                                inputContainerStyle={Inputs.rounded.inputContainerStyle}
                                inputStyle={Inputs.rounded.inputStyle}
                                onChangeText={(text) => this.setState({email: text, login: text})}
                                placeholder='E-mail'
                                autoCapitalize={'none'}

                            />
                            <Input
                                inputContainerStyle={Inputs.rounded.inputContainerStyle}
                                inputStyle={Inputs.rounded.inputStyle}
                                onChangeText={(text) => this.setState({firstName: text})}
                                placeholder='First Name'
                                autoCapitalize={'none'}


                            />
                            <Input
                                inputContainerStyle={Inputs.rounded.inputContainerStyle}
                                inputStyle={Inputs.rounded.inputStyle}
                                onChangeText={(text) => this.setState({lastName: text})}
                                placeholder='Last Name'
                                autoCapitalize={'none'}


                            />

                            <Input
                                inputContainerStyle={Inputs.rounded.inputContainerStyle}
                                inputStyle={Inputs.rounded.inputStyle}
                                onChangeText={(text) => this.setState({password: text})}
                                placeholder='Password'
                                secureTextEntry={true}
                                autoCapitalize={'none'}
                            />

                            <Button title={'Sign Up'}  titleStyle={[Buttons.rounded.title, {color: iOSColors.white}]}
                                    onPress={this._onSignUpPress}
                                    buttonStyle={[Buttons.rounded.solidStyle, {width: widthPercentageToDP('60%')}]}/>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    componentDidUpdate() {
        if (this.props.registerState.isSuccessful) {
            this.props.navigation.navigate('AuthLoading');
        }
    }

    _onSignUpPress = () => {
        this.props.register(this.state);
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        registerState: state.loginState
    };
};


export default connect(mapStateToProps, actions)(SignUpScreen);

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
        height: heightPercentageToDP('30%'),
        marginTop: heightPercentageToDP('10%'),
        width: widthPercentageToDP('75%')
    }
});
