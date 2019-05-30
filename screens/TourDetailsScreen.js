import React from 'react';
import {ActivityIndicator, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {Button, Divider, Image, ListItem} from "react-native-elements";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import Typography from "../styles/Typography";
import Buttons from "../styles/Buttons";
import {iOSColors} from "react-native-typography";
import Carousel, {Pagination} from "react-native-snap-carousel";
import SliderEntry from "../components/SliderEntry";

const SLIDER_1_FIRST_ITEM = 1;


class TourDetailsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Details'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 1
        }

    }


    renderCarousel() {
        const data = [];
        const {tour} = this.props.state;
        console.log(tour);

        if (tour.images) {
            tour.images.forEach(i => {
                data.push({
                    id: tour.placeId,
                    illustration: i.uri
                })
            });
        }
        const {slider1ActiveSlide} = this.state;

        return (
            <View>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={data}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={widthPercentageToDP('100%')}
                    itemWidth={widthPercentageToDP('80%')}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
                />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(100, 100, 100, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={iOSColors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    _renderItemWithParallax = ({item, index}, parallaxProps) => {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

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
        const {tour} = this.props.state;

        if (!this.props.state.tour) {
            return null;
        }
        const list = [
            {
                title: `Duration ${tour.duration} hours`,
                icon: 'av-timer'
            },
            {
                title: `Price ${tour.price}$`,
                icon: 'attach-money'
            },
        ]
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.listHeader, {textAlign: 'left'}]}> {tour.name}</Text>
                    <View style={{height: heightPercentageToDP('35%')}}>
                    {   this.renderCarousel()}
                    </View>
                    <Button title={'Book now'} titleStyle={[Buttons.rounded.title, {color: iOSColors.white}]}
                            onPress={() => Linking.openURL(`tel:+${tour.tel}`)}
                            buttonStyle={[Buttons.rounded.solidStyle, {
                                width: widthPercentageToDP('85%'),
                                backgroundColor: iOSColors.pink,
                                marginTop: 20
                            }]}/>
                    <Text style={[Typography.subhead, {
                        textAlign: 'center',
                        marginTop: 20,
                        lineHeight: 25
                    }]}>{tour.description}</Text>
                    <Text style={[Typography.headline, {textAlign: 'center', marginTop: 20}]}>
                        About this activity
                    </Text>

                    <View style={{alignSelf: 'flex-start', width: widthPercentageToDP('85%')}}>
                        {
                            list.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftIcon={{name: item.icon}}
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
    }
    ,
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 10
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3
    },

    slider: {
        overflow: 'visible' // for custom animations
    },

});

const mapStateToProps = (state, ownProps) => {
    console.log(state.establishmentDetailsScreenState.tour);
    return {
        state: state.establishmentDetailsScreenState
    };
};

export default connect(mapStateToProps, actions)(TourDetailsScreen)