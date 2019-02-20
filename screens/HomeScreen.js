import React from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Autocomplete from "../components/Autocomplete";
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {GOOGLE_API_KEY} from "../constants/Google";
import axios from "axios"


class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    downloadImage = (item) => {
        console.log(item.photos[0].html_attributions[0].photo_reference);
        axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`,
            {
                headers: {
                    'Content-Type': 'image/jpeg'
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        return item.icon;
    };

    renderRestaurants = (establishments) => {
        return (
            <View>
                <ListItem
                    key={0}
                    title={'Restaurants'}
                    badge={{value: establishments.restaurants.length}}
                    chevron={true}
                    leftIcon={{name: 'restaurant'}}
                />
               {/* {
                    establishments.restaurants.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.name}
                            chevron={true}
                            leftAvatar={{source: {uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`}}}
                        />
                    ))
                }*/}
            </View>
        )
    };
    renderCafes = (establishments) => {
        return (
            <View>
                <ListItem
                    key={1}
                    title={'Cafes'}
                    badge={{value: establishments.cafes.length}}
                    chevron={true}
                    leftIcon={{name: 'local-cafe'}}
                />
            </View>
        )
    };
    renderParks = (establishments) => {
        return (
            <ListItem
                key={2}
                title={'Parks'}
                badge={{value: establishments.parks.length}}
                chevron={true}
                leftIcon={{name: 'local-parking'}}

            />
        )
    };
    renderZoos = (establishments) => {
        return (
            <ListItem
                key={3}
                title={'Zoos'}
                badge={{value: establishments.zoos.length}}
                chevron={true}
                leftIcon={{name: 'pets'}}
            />
        )
    };
    renderMuseums = (establishments) => {
        return (
            <ListItem
                key={4}
                title={'Museums'}
                badge={{value: establishments.museums.length}}
                chevron={true}
                leftIcon={{name: 'report-problem'}}
            />
        )
    };

    render() {
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
    console.log(state.establishmentsStore);
    return {
        establishments: state.establishmentsStore
    };
};

export default connect(mapStateToProps, actions)(HomeScreen)