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

class FavouriteScreen extends React.Component {
    static navigationOptions = {
        title: 'Favourites',
    };


    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <Text>Favourites</Text>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        state: state.profileScreenState,
    };
};

export default connect(mapStateToProps, actions)(FavouriteScreen);

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
