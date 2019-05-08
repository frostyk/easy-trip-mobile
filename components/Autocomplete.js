import React from 'react';
import {Divider, Icon, Input, ListItem, SearchBar} from "react-native-elements";
import {Platform, StyleSheet, View, ScrollView, Text} from "react-native";
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {heightPercentageToDP, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {CAFE, MUSEUM, NIGHT_CLUB, PARK, RESTAURANT, ZOO} from "../constants/Google";
import Inputs from "../styles/Inputs";
import {iOSColors} from "react-native-typography";

class Autocomplete extends React.Component {


    _updateSearch = search => {
        this.props.changeHomeScreenState({search});
        this.props.fetchPlaces(search);
    };

    onItemPress = item => {
        const establishmentsTypes = [RESTAURANT, MUSEUM, PARK, ZOO, NIGHT_CLUB, CAFE];
        const testedTypes = [RESTAURANT]; //TODO chnage to all needed places
        this.props.cleanPlaces();
        testedTypes.forEach(type => {
            this.props.geocodeAddressByPlaceIdAndFindPlaces(item.place_id, type, 1500);
        });
        this.props.fetchTours(item.place_id);
    };

    render() {
        return (
            <View style={styles.container}>
                <Input
                    inputContainerStyle={[Inputs.rounded.inputContainerStyle, {paddingLeft: 0, marginBottom: 0}]}
                    inputStyle={[Inputs.rounded.inputStyle, {width: wp('95%')}]}
                    placeholder={'Start typing your location'}
                    onChangeText={this._updateSearch}
                    value={this.props.state.location}
                    leftIcon={
                        <Icon
                            name='navigation'
                            color={iOSColors.pink}
                            raised
                            size={14}
                        />
                    }
                />
                <ScrollView >
                    {
                        this.props.places.map((item, i) => (
                            <ListItem
                                key={i}
                                containerStyle={styles.locationList}
                                title={

                                    <Text style={Inputs.rounded.labelStyle}> {item.description}</Text>

                                }
                                onPress={(e) => this.onItemPress(item)}
                            />
                        ))
                    }
                    <Divider />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        width: wp('100%'),
        zIndex: 100,
        backgroundColor: '#fff',
        paddingBottom: 10
    },
    listStyle: {
        borderBottomWidth: 1
    },
    locationList: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
    }
});


const mapStateToProps = (state, ownProps) => {
    return {
        state: state.homeScreenState,
        places: state.places.places,
        establishments: state.establishments.establishments,
        geocode: state.geocode.results,
    };
};

export default connect(mapStateToProps, actions)(Autocomplete)