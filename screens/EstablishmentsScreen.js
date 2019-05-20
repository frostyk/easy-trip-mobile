import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {ESTABLISHMENT} from "../constants/Google";
import {PlacesList} from "../components/PlacesList";

class EstablishmentsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            title: 'Establishments'
        }
    };

    render() {
        if (!this.props.state.establishments.length) {
            return null;
        }
        const {establishments} = this.props.state;
        return (
            <PlacesList
                data={establishments}
                onClick={item => this.viewDetails(item)}
            />
        );
    }

    viewDetails = (item) => {
        alert('click');
        if (item.type === ESTABLISHMENT) {
            this.props.fetchEstablishmentDetails(item.place_id);
            this.props.navigation.navigate('EstablishmentDetails');
        } else {
            this.props.changeEstablishmentDetailsScreenState({tour: item});
            this.props.navigation.navigate('TourDetails');
        }
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
        state: state.establishmentScreenState
    };
};

export default connect(mapStateToProps, actions)(EstablishmentsScreen)