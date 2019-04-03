import React from 'react';
import {Divider, ListItem, SearchBar} from "react-native-elements";
import {Platform, StyleSheet, View, ScrollView} from "react-native";
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {CAFE, MUSEUM, NIGHT_CLUB, PARK, RESTAURANT, ZOO} from "../constants/Google";

class Autocomplete extends React.Component {


    updateSearch = search => {
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
    };

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    lightTheme={true}
                    placeholder="City. location ..."
                    onChangeText={this.updateSearch}
                    value={this.props.state.search}
                />
                <ScrollView >
                    {
                        this.props.places.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.description}
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
        width: widthPercentageToDP('100%'),
        zIndex: 100
    },
    listStyle: {
        borderBottomWidth: 1
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