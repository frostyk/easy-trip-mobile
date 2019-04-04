import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Divider, Icon, Image, Input, ListItem} from "react-native-elements";

import {connect} from "react-redux";
import * as actions from "../redux/actions";
import Inputs from "../styles/Inputs";
import Typography from "../styles/Typography";
import {iOSColors} from "react-native-typography";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ImagePicker, MapView, Permissions} from 'expo';
import Buttons from "../styles/Buttons";
import {_} from "lodash"

class CreateScreen extends React.Component {
    static navigationOptions = {
        title: 'Create Tour',
    };

    _updateSearch = search => {
        this.props.changeCreateScreenState({location: search, locationsListVisible: true});
        this.props.fetchPlaces(search);
    };

    _pickLocation = location => {
        this.props.changeCreateScreenState({locationsListVisible: false, location: location.description, placeId: location.place_id});
        this.props.geocodeAddressByPlaceIdForTour(location.place_id, this.map);
    };

    _checkPermission = async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'granted') {
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        }
        return Promise.resolve();
    };

    _pickImage = async () => {
        try {
            if (this.props.state.images.length === 4) {
                throw new Error('Your exceeded maximum amount of images');
            }
            await this._checkPermission();
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                aspect: [4, 3],
            });

            if (!result.cancelled) {
                this.props.changeCreateScreenState({images: [...this.props.state.images, {uri: result.uri}]});
            }
        } catch (e) {
            alert(e);
        }
    };

    _createTour = () => {
        const tour = _.pick(this.props.state, ['title', 'description', 'price', 'duration', 'placeId', 'images']);
        this.props.createTour(tour);
    };

    _changeState = (state) => {
        this.props.changeCreateScreenState(state);
    };

    renderMap = () => {
        const {coords} = this.props.state;
        return (
            <View style={{borderRadius: 20, marginVertical: 50,
                shadowColor: iOSColors.pink,
                shadowOffset: {height: 0, width: 0},
                shadowOpacity: 0.5,
                shadowRadius: 3, padding: 5}}>
                <MapView
                    ref={map => { this.map = map }}
                    style={{width: wp('90%'), height: hp('40%')}}
                    initialRegion={{
                        latitude: coords.lat,
                        longitude: coords.lng,
                        latitudeDelta: 0.0082,
                        longitudeDelta: 0.0021,
                    }}>
                    <MapView.Marker
                        coordinate={{
                            latitude: coords.lat,
                            longitude:  coords.lng,
                        }}
                        title={this.props.state.location}
                    />
                </MapView>
            </View>
        )
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={[Typography.headline, {textAlign: 'center'}]}>CREATE THE NEW TOUR</Text>
                    <Text style={[Typography.headline, styles.quote]}>The wisest mind has something yet to learn.</Text>

                </View>
                {this.props.state.screenState === 1 ? <View style={styles.inputs}>
                        <Input
                            inputContainerStyle={[Inputs.rounded.inputContainerStyle]}
                            inputStyle={[Inputs.rounded.inputStyle, {width: wp('90%')}]}
                            placeholder={'Enter your title'}
                            label={'Title'}
                            onChangeText={(title) => this._changeState({title})}
                            labelStyle={Inputs.rounded.labelStyle}
                        />
                        <Input
                            inputContainerStyle={Inputs.rounded.areaContainerStyle}
                            inputStyle={Inputs.rounded.inputStyle}
                            placeholder={'Enter your description'}
                            label={'Description'}
                            onChangeText={(description) => this._changeState({description})}
                            labelStyle={Inputs.rounded.labelStyle}
                        />
                        <Input
                            inputContainerStyle={[Inputs.rounded.inputContainerStyle, {paddingLeft: 0}]}
                            inputStyle={[Inputs.rounded.inputStyle]}
                            placeholder={'Enter tour price'}
                            label={'Price'}
                            onChangeText={(price) => this._changeState({price})}
                            labelStyle={Inputs.rounded.labelStyle}
                            leftIcon={
                                <Icon
                                    type='font-awesome'
                                    name='dollar'
                                    color={iOSColors.pink}
                                    raised
                                    size={14}
                                />
                            }
                        />
                        <Input
                            inputContainerStyle={[Inputs.rounded.inputContainerStyle, {paddingLeft: 0}]}
                            inputStyle={[Inputs.rounded.inputStyle]}
                            placeholder={'Enter tour duration in minutes'}
                            label={'Duration'}
                            onChangeText={(duration) => this._changeState({duration})}
                            labelStyle={Inputs.rounded.labelStyle}
                            leftIcon={
                                <Icon
                                    type='evilicon'
                                    name='clock'
                                    color={iOSColors.pink}
                                    raised
                                    size={14}
                                />
                            }
                        />
                        <View>
                            <Text style={[Inputs.rounded.labelStyle]}>Attachments </Text>
                            <TouchableOpacity onPress={this._pickImage}>
                                <View style={[Inputs.rounded.areaContainerStyle, styles.dragArea]}>
                                    {this.props.state.images.length === 0 ?
                                        <Text style={[Inputs.rounded.labelStyle, styles.dragAreaLabel]}>Add <Text
                                            style={{color: iOSColors.midGray}}> your images here </Text></Text>
                                        :
                                        <View style={{flexDirection: 'row'}}>
                                            {this.props.state.images.map((img, index) => {
                                                return (
                                                    <Image
                                                        key={index}
                                                        source={{uri: img.uri}}
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            marginHorizontal: 10,
                                                            borderRadius: 5
                                                        }}
                                                    />
                                                )
                                            })}
                                        </View>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Button title={'Next'} titleStyle={[Buttons.rounded.title, {color: iOSColors.white}]}
                                onPress={() => this.props.changeCreateScreenState({screenState: 2})}
                                buttonStyle={[Buttons.rounded.solidStyle, {
                                    width: wp('95%'),
                                    backgroundColor: iOSColors.pink
                                }]}/>
                    </View> :
                    <View style={{width: wp('100%'), alignItems: 'center'}}>
                        <Input
                            inputContainerStyle={[Inputs.rounded.inputContainerStyle, {paddingLeft: 0, marginBottom: 0}]}
                            inputStyle={[Inputs.rounded.inputStyle, {width: wp('95%')}]}
                            placeholder={'Start typing your location'}
                            label={'Location'}
                            labelStyle={Inputs.rounded.labelStyle}
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
                        {this.props.state.locationsListVisible && <ScrollView style={{width: wp('95%')}}>
                            {
                                this.props.places.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        containerStyle={styles.locationList}
                                        title={

                                            <Text style={Inputs.rounded.labelStyle}> {item.description}</Text>

                                        }
                                        onPress={(e) => this._pickLocation(item)}
                                    />
                                ))
                            }
                            <Divider/>
                        </ScrollView> }
                        {this.renderMap()}
                        <Button title={'Create'} titleStyle={[Buttons.rounded.title, {color: iOSColors.white}]}
                                onPress={() => this._createTour()}
                                buttonStyle={[Buttons.rounded.solidStyle, {
                                    width: wp('95%'),
                                    backgroundColor: iOSColors.pink
                                }]}/>
                    </View>
                }
            </ScrollView>
        );
    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.createScreenState,
        places: state.places.places,
    };
};

export default connect(mapStateToProps, actions)(CreateScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        backgroundColor: '#fff'
    },
    navbar: {
        alignItems: 'center'
    },
    quote: {
        color: iOSColors.gray,
        width: wp('75%'),
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 10
    },
    inputs: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('100%'),
        paddingBottom: 50
    }, dragArea: {
        width: wp('95%'),
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }, dragAreaLabel: {
        fontSize: 16,
        fontWeight: '600'
    }, locationList: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
    }
});
