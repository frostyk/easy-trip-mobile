import React from 'react';
import {Linking, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import Autocomplete from "../components/Autocomplete";
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import Typography from "../styles/Typography";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {iOSColors} from "react-native-typography";
import {List} from "../components/List";
import {ESTABLISHMENT, GOOGLE_API_KEY, RESTAURANT, TOUR} from "../constants/Google";

const Tours = [
    {
        images: ['https://dummyimage.com/600x400/000/eee&text=Tour+1'],
        title: 'Tour 1',
        vicinity: 'Address',
    },
    {
        images: ['https://dummyimage.com/600x400/000/fff&text=Tour+2'],
        title: 'Tour 2',
        vicinity: 'Address'
    },
    {
        images: ['https://dummyimage.com/600x400/000/fff&text=Tour+3'],
        title: 'Tour 3',
        vicinity: 'Address'
    },
];

const RESTAURANTS = [
    {
        img: 'https://dummyimage.com/600x400/000/fff&text=Res+1',
        name: 'Place 1',
        vicinity: 'Vcinity',
    },
    {
        img: 'https://dummyimage.com/600x400/000/fff&text=Res+2',
        name: 'Place 2',
        vicinity: 'Vcinity'
    },
    {
        img: 'https://dummyimage.com/600x400/000/fff&text=Res+3',
        name: 'Place 3',
        vicinity: 'Vcinity'
    },
];
const THEATRES = [
    {
        img: 'https://dummyimage.com/600x400/000/fff&text=Theater+1',
        name: 'Theater 1',
        vicinity: 'Vcinity',
        rating: 2,
        price_level: 2
    },
    {
        img: 'https://dummyimage.com/600x400/000/fff&text=Theater+2',
        name: 'Theater 2',
        vicinity: 'Vcinity',
        rating: 4,
        price_level: 3
    },
    {
        img: 'https://dummyimage.com/600x400/000/fff&text=Theater+3',
        name: 'Theater 3',
        vicinity: 'Vcinity',
        rating: 3,
        price_level: 1

    },
];
const MUSEUMS = [
    {
        img: 'https://dummyimage.com/500x300/000/4049c2&text=Museum+1',
        name: 'Museum 1',
        vicinity: 'Vcinity'
    },
    {
        img: 'https://dummyimage.com/500x300/000/4049c2&text=Museum+2',
        name: 'Museum 2',
        vicinity: 'Vcinity'
    },
    {
        img: 'https://dummyimage.com/500x300/000/4049c2&text=Museum+3',
        name: 'Museum 3',
        vicinity: 'Vcinity'
    },
];
const HOTELS = [
    {
        img: 'https://dummyimage.com/500x300/000/1f5729&text=Hotel+1',
        name: 'Museum 1',
        vicinity: 'Vcinity'
    },
    {
        img: 'https://dummyimage.com/500x300/000/1f5729&text=Hotel+2',
        name: 'Hotel 2',
        vicinity: 'Vcinity'
    },
    {
        img: 'https://dummyimage.com/500x300/000/1f5729&text=Hotel+3',
        name: 'Hotel 3',
        vicinity: 'Vcinity'
    },
];


class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    navigateToAndSetTitle = (route, title, establishments) => {
        this.props.navigation.setParams({title});
        this.props.navigation.navigate(route);
        this.props.changeEstablishmentScreenState({establishments})
    };

    openMap = () => {
        const lat = this.props.geocode.results[0].geometry.location.lat;
        const lng = this.props.geocode.results[0].geometry.location.lng;
        const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
        const latLng = `${lat},${lng}`;
        const label = 'Easy Trip Search';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url);
    }

    parseEstablishments = (establishments, type) => {
        return establishments.map(item => {
            return {
                id: item.id,
                img: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`,
                name: item.name,
                place_id: item.place_id,
                vicinity: item.vicinity,
                price_level: item.price_level,
                rating: item.rating,
                establishmentType: type,
                type: ESTABLISHMENT
            }
        });
    };

    mapTours = (establishments) => {
        return establishments.map(item => {
            return {
                id: item.id,
                images: item.images ,
                name: item.title,
                duration: item.duration,
                price: item.price,
                tel: item.tel,
                description: item.description,
                type: TOUR
            }
        });
    }

    render() {
        const {establishments} = this.props;
        const tours = this.mapTours(establishments.tours);

        const restaurants = this.parseEstablishments(establishments.restaurants, RESTAURANT); //TODO uncomment for real data
        const city = this.props.geocode.results.length > 0 ? this.props.geocode.results[0].formatted_address : 'City';
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <Autocomplete/>
                    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.header}> {city} </Text>
                            <Divider style={styles.divider}/>
                            <View style={{alignSelf: 'flex-start', flexDirection: 'row'}}>
                                <Icon
                                    name='library-books'
                                    iconStyle={{padding: 10}}
                                    color={'#6c00df'}/>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(`https://www.google.com/search?q=${city}`)}>
                                    <Text style={styles.link}>About {city}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignSelf: 'flex-start', flexDirection: 'row'}}>
                                <Icon
                                    name='navigation'
                                    iconStyle={{padding: 10}}
                                    color={'#6c00df'}/>
                                <TouchableOpacity
                                    onPress={() => this.openMap()}>
                                    <Text style={styles.link}>Navigate</Text>
                                </TouchableOpacity>
                            </View>
                            {tours.length > 0 &&
                            <View>
                                <Divider style={styles.divider}/>
                                <List data={tours} title={'Best Tours'}
                                      onIconClick={() => this.navigateToAndSetTitle('Establishments', 'Best Tours', tours)}/>
                            </View>}
                            <Divider style={styles.divider}/>
                            <List data={restaurants} title={'Best Restaurants'}
                                  onIconClick={() => this.navigateToAndSetTitle('Establishments', 'Best Restaurants', restaurants)}/>
                            <Divider style={styles.divider}/>
                            <List data={THEATRES} title={'Best Theatres'}
                                  onIconClick={() => this.navigateToAndSetTitle('Establishments', 'Best Theatres', THEATRES)}/>
                            <Divider style={styles.divider}/>
                            <List data={MUSEUMS} title={'Best Museums'}
                                  onIconClick={() => this.navigateToAndSetTitle('Establishments', 'Best Museums', MUSEUMS)}/>
                            <Divider style={styles.divider}/>
                            <List data={HOTELS} title={'Best Hotels'}
                                  onIconClick={() => this.navigateToAndSetTitle('Establishments', 'Best Hotels', HOTELS)}/>

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
        marginTop: 70,
        shadowOpacity: 0.75,
        shadowRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {height: 0, width: 0},
        backgroundColor: '#fff',
        width: widthPercentageToDP('95%'),
        paddingBottom: 50
    },
    header: {
        ...Typography.title,
        padding: 10,
        fontWeight: '600'
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
    link: {
        ...Typography.headline,
        color: '#6c00df',
        paddingVertical: 10,
    },
    divider: {
        backgroundColor: iOSColors.lightGray,
        marginBottom: 5,
        marginTop: 5
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        establishments: state.establishmentsStore,
        geocode: state.geocode
    };
};

export default connect(mapStateToProps, actions)(HomeScreen)