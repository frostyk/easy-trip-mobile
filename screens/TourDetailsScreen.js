import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {Button, Divider, Image, ListItem} from "react-native-elements";
import {heightPercentageToDP, widthPercentageToDP, wp} from "react-native-responsive-screen";
import Typography from "../styles/Typography";
import Buttons from "../styles/Buttons";
import {iOSColors} from "react-native-typography";

class TourDetailsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Details'
        }
    };

    updateIndex = (selectedIndex) => {
        this.props.changeEstablishmentDetailsScreenState({selectedIndex});
    };


    renderDescription = (establishment) => {
        return (
            <View style={styles.descriptionDetails}>
                <Divider style={styles.divider}/>
                <View style={styles.descriptionDetailsItem}>
                    <Text style={styles.descriptionItemHeader}>
                        Address
                    </Text>
                    <Text style={styles.descriptionItemText}>
                        {establishment.vicinity}
                    </Text>
                </View>
                <Divider style={styles.divider}/>
            </View>
        )
    };


    render() {
        if (!this.props.state.tour) {
            return null;
        }
        const list = [
            {
                title: 'Duration 3 hourrs',
                icon: 'av-timer'
            },
            {
                title: 'Trips',
                icon: 'flight-takeoff'
            },
            {
                title: 'Price 10$',
                icon: 'attach-money'
            },
        ]
        const {tour} = this.props.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.listHeader, {textAlign: 'left'} ]}> Lviv: 3-Hour Romantic Tour with Food and  Coffee Tasting</Text>
                    <Image
                        source={{uri: tour.img}}
                        style={{width: widthPercentageToDP('85%'), height: heightPercentageToDP('25%'), borderRadius: 20}}
                        PlaceholderContent={<ActivityIndicator/>}
                    />
                    <Button title={'Book now'} titleStyle={[Buttons.rounded.title, {color: iOSColors.white}]}
                            onPress={() => this._createTour()}
                            buttonStyle={[Buttons.rounded.solidStyle, {
                                width: widthPercentageToDP('85%'),
                                backgroundColor: iOSColors.pink,
                                marginTop: 20
                            }]}/>
                    <Text style={[Typography.subhead, {textAlign: 'center', marginTop: 20, lineHeight: 25}]}>
                        Explore the romantic side of Lviv with the person you love. Hear the love stories of Lviv, see the old city streets, drink some coffee in a dark mine and enjoy romantic dishes.
                    </Text>
                   <Text style={[Typography.headline, {textAlign: 'center', marginTop: 20}]}>
                       About this activity
                   </Text>

                    <View style={{alignSelf: 'flex-start', width: widthPercentageToDP('85%')}}>
                        {
                            list.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftIcon={{ name: item.icon }}
                                />
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    listHeader: {
        ...Typography.title,
        marginTop: 5,
        marginBottom: 20,
        fontSize: 24,
        fontWeight: '600'
    },
});

const mapStateToProps = (state, ownProps) => {
    console.log(state.establishmentDetailsScreenState.tour);
    return {
        state: state.establishmentDetailsScreenState
    };
};

export default connect(mapStateToProps, actions)(TourDetailsScreen)