import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Text} from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import Typography from '../styles/Typography';
import {iOSColors} from 'react-native-typography'
import {SectionDivider} from "../components/Divider";


export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.header}>
                    <Avatar containerStyle={styles.avatar} rounded title="MD" size={'large'} />
                    <Text style={[Typography.title2, styles.name]}>Rostyk Lytvyn</Text>
                    <Text style={[Typography.headline, styles.quote]}>The wisest mind has something yet to learn.</Text>
                </View>
                <SectionDivider title={'Visited'}/>
            </ScrollView>
        );
    }
}

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
