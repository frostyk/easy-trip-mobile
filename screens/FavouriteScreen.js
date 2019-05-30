import React from 'react';
import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {iOSColors} from 'react-native-typography'
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {PlacesList} from "../components/PlacesList";
import {ESTABLISHMENT} from "../constants/Google";

class FavouriteScreen extends React.Component {
    static navigationOptions = {
        title: 'Favourites',
    };

    componentDidMount() {
        this.props.fetchFavourites();
    }

    viewDetails = (item) => {
        if (item.type === ESTABLISHMENT) {
            this.props.fetchEstablishmentDetails(item.place_id);
            this.props.navigation.navigate('EstablishmentDetails');
        } else {
            this.props.changeEstablishmentDetailsScreenState({tour: item});
            this.props.navigation.navigate('TourDetails');
        }
    }




    render() {
        return (
            <PlacesList onClick={item => this.viewDetails(item)} deleteFavourite={id => this.props.deleteFavourite(id)} data={this.props.state.list}/>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        state: state.fetchFavouritesState,
    };
};

export default connect(mapStateToProps, actions)(FavouriteScreen);

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('35%')
    },
    avatar: {
        marginVertical: 20
    },
    name: {
        paddingVertical: 10
    },
    quote: {
        color: iOSColors.gray,
        width: wp('75%'),
        textAlign: 'center'
    }
});
