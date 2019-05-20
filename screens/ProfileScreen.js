import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Text} from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import Typography from '../styles/Typography';
import {iOSColors} from 'react-native-typography'
import {SectionDivider} from "../components/Divider";
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import firebase from 'firebase'

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    _logoutAsync = () => {
        firebase.auth().signOut();
    }

    getUserInfo = async () => {
        this.props.changeProfileScreenState({user: firebase.auth().currentUser})
    }


    async componentDidMount () {
       await this.getUserInfo();
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.header}>
                    <Avatar
                        rounded
                        size={'large'}
                        source={{
                            uri: this.props.state.user.photoURL,
                        }}
                    />
                    <Text style={[Typography.title2, styles.name]}>{this.props.state.user.displayName}</Text>
                    <Text style={[Typography.headline, styles.quote]}>{this.props.state.user.email}</Text>
                </View>
                <Button
                    title={'Logout'}
                    onPress={this._logoutAsync}
                />
            </ScrollView>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        logoutState: state.logoutState,
        state: state.profileScreenState,
    };
};

export default connect(mapStateToProps, actions)(ProfileScreen);

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('35%')
    },
    avatar: {
        marginVertical: 20
    },
    name: {
        paddingVertical: 10
    },
    quote: {
        color: iOSColors.gray,
        width: wp('75%'),
        textAlign: 'center'
    }
});
