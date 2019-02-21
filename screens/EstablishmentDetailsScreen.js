import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {AirbnbRating, ButtonGroup, Card, Image} from "react-native-elements";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {GOOGLE_API_KEY} from "../constants/Google";
import {changeEstablishmentDetailsScreenState} from "../redux/actions";

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
        const buttons = ['Details', 'Location', 'Reviews'];

        return (
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={this.props.state.selectedIndex}
                buttons={buttons}
                containerStyle={{height: 50}}
            />
        )
    };

    renderReviews = (establishment) => {
        return (
            <View>
                <Card title="Raiting">
                    <AirbnbRating readonly={true} defaultRating={Math.round(establishment.rating)}/>
                </Card>
            </View>
        )
    };

    render() {
        if (!this.props.state.establishment) {
            return null;
        }
        const {establishment} = this.props.state;
        console.log(establishment);
        return (
            <ScrollView>
                <Image
                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${establishment.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`}}
                    style={{width: widthPercentageToDP('100%'), height: heightPercentageToDP('30%')}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                {this.renderButtonsGroup()}
                {this.props.state.selectedIndex === 2 && this.renderReviews(establishment)}
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
});

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.establishmentDetailsScreenState
    };
};

export default connect(mapStateToProps, actions)(EstablishmentDetailsScreen)