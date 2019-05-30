import React from 'react';
import {ActivityIndicator, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {Button, Divider, Image, ListItem} from "react-native-elements";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import Typography from "../styles/Typography";
import Buttons from "../styles/Buttons";
import {iOSColors} from "react-native-typography";
import {ImageCarousel} from "../components/ImageCarousel";

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
    }


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

});

const mapStateToProps = (state, ownProps) => {
    console.log(state.establishmentDetailsScreenState.tour);
    return {
        state: state.establishmentDetailsScreenState
    };
};

export default connect(mapStateToProps, actions)(TourDetailsScreen)