import React from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Autocomplete from "../components/Autocomplete";
import {connect} from "react-redux";
import * as actions from "../redux/actions";


class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    navigateToAndSetTitle = (routeConfig) => {
        const {route, title, establishments} = routeConfig;
        this.props.navigation.setParams({title});
        this.props.navigation.navigate(route);
        this.props.changeEstablishmentScreenState({establishments})
    };

    renderEstablishmentListItem = (key, title, badgeValue, iconName, routeConfig) => {
        return (
            <ListItem
                key={key}
                title={title}
                badge={{value: badgeValue}}
                chevron={true}
                leftIcon={{name: iconName}}
                onPress={() => this.navigateToAndSetTitle(routeConfig)}
            />
        );
    };

    renderRestaurants = (establishments) => {
        return this.renderEstablishmentListItem(0, 'Restaurants', establishments.restaurants.length, 'restaurant', {route: 'Establishments', title: 'Restaurants', establishments: this.props.establishments.restaurants})
    };
    renderCafes = (establishments) => {
        return this.renderEstablishmentListItem(1, 'Cafes', establishments.cafes.length, 'local-cafe', {route: 'Establishments', title: 'Cafes', establishments: this.props.establishments.cafes})
    };

    renderParks = (establishments) => {
        return this.renderEstablishmentListItem(2, 'Parks', establishments.parks.length, 'local-parking', {route: 'Establishments', title: 'Parks', establishments: this.props.establishments.parks})
    };

    renderZoos = (establishments) => {
        return this.renderEstablishmentListItem(3, 'Zoos', establishments.zoos.length, 'pets', {route: 'Establishments', title: 'Zoos',  establishments: this.props.establishments.zoos})
    };

    renderMuseums = (establishments) => {
        return this.renderEstablishmentListItem(4, 'Museums', establishments.museums.length, 'pets', {route: 'Establishments', title: 'Museums', establishments: this.props.establishments.museums})
    };

    render() {
        console.log(this.props);
        const {establishments} = this.props;
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <Autocomplete/>
                    <ScrollView>
                        <View style={styles.contentContainer}>
                            {this.renderRestaurants(establishments)}
                            {this.renderCafes(establishments)}
                            {this.renderParks(establishments)}
                            {this.renderZoos(establishments)}
                            {this.renderMuseums(establishments)}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        paddingTop: 50,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        establishments: state.establishmentsStore
    };
};

export default connect(mapStateToProps, actions)(HomeScreen)