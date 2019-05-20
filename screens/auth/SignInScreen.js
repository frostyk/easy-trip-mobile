import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Input, SocialIcon, Text} from "react-native-elements";
import { Google } from 'expo';
import {connect} from "react-redux";
import * as actions from "../../redux/actions";
import Typography from '../../styles/Typography'
import Inputs from '../../styles/Inputs'
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import Buttons from "../../styles/Buttons";
import {iOSColors} from "react-native-typography";
import firebase from 'firebase'

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

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        let unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                let credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then(function (result) {
                    if (result.additionalUserInfo.isNewUser) {
                        firebase
                            .database()
                            .ref(`/users/${result.user.uid}`)
                            .set({
                                gmail: result.user.email,
                                profile_picture: result.additionalUserInfo.profile.picture,
                                locale: result.additionalUserInfo.profile.locale,
                                first_name: result.additionalUserInfo.profile.given_name,
                                family_name: result.additionalUserInfo.profile.family_name,
                                created_at: Date.now(),
                                access_token: googleUser.accessToken
                            }).then((snapshot) => {
                            this.props.googleLogin()
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        firebase
                            .database()
                            .ref(`/users/${result.user.uid}`)
                            .update({
                                last_logged_in: Date.now(),
                                access_token: googleUser.accessToken
                    })
                    }


                }.bind(this)).catch(function(error) {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    // The email of the user's account used.
                    let email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    let credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            let providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    signInGoogle = async () => {
        let request = {
            clientId: '460829815999-dthb5m2bq0tepekncij5q3dj3gmm6bon.apps.googleusercontent.com',
            scopes: ['profile']
        };

        let result = await Google.logInAsync(request);

        if (result.type === 'success') {
            this.onSignIn(result)
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Text style={[Typography.h1, {alignSelf: 'flex-start'}]}>Sign In</Text>
                        <View style={styles.inputs}>
                            <SocialIcon
                                title='Sign In With Google'
                                button
                                onPress={this.signInGoogle}
                                style={{width: widthPercentageToDP('70%')}}
                                type='google-plus-official' />
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
