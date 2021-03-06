import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View, Text} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {AirbnbRating, ButtonGroup, Card, Divider, Image, ListItem} from "react-native-elements";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {GOOGLE_API_KEY} from "../constants/Google";
import {MapView} from 'expo';
import Typography from "../styles/Typography";
import {ImageCarousel} from "../components/ImageCarousel";

class EstablishmentDetailsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Details'
        }
    };

    updateIndex = (selectedIndex) => {
        this.props.changeEstablishmentDetailsScreenState({selectedIndex});
    };

    renderButtonsGroup = () => {
        const buttons = ['Details', 'Reviews', 'Map'];

        return (
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={this.props.state.selectedIndex}
                buttons={buttons}
                containerStyle={{height: 30}}
            />
        )
    };


    renderCarousel() {
        const data = [];
        const {tour} = this.props.state;

        if (tour.images) {
            tour.images.forEach(i => {
                data.push({
                    id: tour.placeId,
                    illustration: i.uri
                })
            });
        }

        return <ImageCarousel data={data}/>
    }


    renderDescription = (establishment) => {
        const list = [
            {
                title: establishment.vicinity,
                icon: 'room'
            },
            {
                title: establishment.website,
                icon: 'language'
            },
            {
                title: establishment.international_phone_number,
                icon: 'phone'
            },
            {
                title: establishment.open_now ? 'Open now' : 'Close now',
                icon: 'av-timer'
            },
        ]
        return (
            <View style={styles.descriptionDetails}>
                <Text style={[Typography.title,{ margin: 20}]}> {establishment.name}</Text>
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
        )
    };

    renderReviews = (establishment) => {
        return (
            <View>
                <Card title="Raiting">
                    <AirbnbRating readonly={true} defaultRating={Math.round(establishment.rating)}/>
                </Card>
                <Card title="Reviews">
                    {
                        establishment.reviews.map((u, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    leftAvatar={{source: {uri: u.profile_photo_url}}}
                                    title={u.author_name}
                                    subtitle={u.text}

                                />
                            );
                        })
                    }
                </Card>
            </View>
        )
    };

    renderMap = (establishment) => {
        return (
            <View>
                <MapView
                    style={{width: widthPercentageToDP('100%'), height: heightPercentageToDP('50%')}}
                    initialRegion={{
                        latitude: establishment.geometry.location.lat,
                        longitude: establishment.geometry.location.lng,
                        latitudeDelta: 0.0082,
                        longitudeDelta: 0.0021,
                    }}>
                    <MapView.Marker
                        coordinate={{
                            latitude: establishment.geometry.location.lat,
                            longitude: establishment.geometry.location.lng,
                        }}
                        title={establishment.name}
                    />
                </MapView>
            </View>
        )
    };

    render() {
        if (!this.props.state.establishment) {
            return null;
        }
        const {establishment} = this.props.state;
        const images = establishment.photos.map ((photo, index) => {
            return {
                id: index,
                illustration: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
            }
        });
        return (
            <ScrollView>
                <ImageCarousel data={images}/>
                {this.renderButtonsGroup()}
                {this.props.state.selectedIndex === 0 && this.renderDescription(establishment)}
                {this.props.state.selectedIndex === 1 && this.renderReviews(establishment)}
                {this.props.state.selectedIndex === 2 && this.renderMap(establishment)}
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    descriptionContainer: {
        flex: 1,
        marginTop: 30,
        paddingLeft: 30,
        paddingRight: 30
    },
    descriptionTitle: {
        fontSize: 14
    },
    descriptionDetails: {
        marginTop: 20,
    },
    descriptionDetailsItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    descriptionItemHeader: {
        fontSize: 14
    },
    descriptionItemText: {
        fontSize: 14
    },
    divider: {
        backgroundColor: 'grey',
        marginBottom: 5,
        marginTop: 5
    },
});

const mapStateToProps = (state, ownProps) => {
    console.log(state.establishmentDetailsScreenState)
    return {
        state: state.establishmentDetailsScreenState
    };
};

export default connect(mapStateToProps, actions)(EstablishmentDetailsScreen)