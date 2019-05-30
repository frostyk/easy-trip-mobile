import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iOSColors} from "react-native-typography";
import {widthPercentageToDP} from "react-native-responsive-screen";
import Carousel, {Pagination} from "react-native-snap-carousel";
import SliderEntry from "./SliderEntry";
import PropTypes from "prop-types";

export class ImageCarousel extends React.Component {
    SLIDER_1_FIRST_ITEM = 1;


    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 1
        }

    }

    render() {
        const {slider1ActiveSlide} = this.state;

        return (
            <View>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={this.props.data}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={widthPercentageToDP('100%')}
                    itemWidth={widthPercentageToDP('80%')}
                    hasParallaxImages={true}
                    firstItem={this.SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
                />
                <Pagination
                    dotsLength={this.props.data.length}
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

}

ImageCarousel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
}

const styles = StyleSheet.create({

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
