import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text} from "react-native-elements";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Typography from '../styles/Typography';
import {iOSColors} from 'react-native-typography'
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import firebase from 'firebase'
import BarChart from "react-native-chart-kit/src/bar-chart";
import {RESTAURANT, TOUR} from "../constants/Google";

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


    async componentDidMount() {
        await this.getUserInfo();
        this.props.fetchFavourites();
    }

    renderChart = () => {
        const establishments = this.props.favourites;
        let resCount = establishments.filter(i => i.establishmentType === RESTAURANT).length;
        let toursCount = establishments.filter(i => i.type === TOUR).length;
        const chartConfig = {
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            }
        }
        const data = {
            labels: ['Hotels', 'Theaters', 'Tours', 'Restaurants'],
            datasets: [{
                data: [0, 0, toursCount / establishments.length * 100, resCount / establishments.length * 100]
            }]
        }

        return (
            <View>
                <BarChart
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                    data={data}
                    width={wp('85%')}
                    height={220}
                    yAxisLabel={'%'}
                    chartConfig={chartConfig}
                />
            </View>
        )
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
                <Card title="Preferable places">
                    {this.renderChart()}
                </Card>

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
        favourites: state.fetchFavouritesState.list,

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
