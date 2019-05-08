import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {Button, Card, Icon} from "react-native-elements";
import {ESTABLISHMENT} from "../constants/Google";

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
            <ScrollView>
                {
                    establishments.map((item, index) => (
                        <Card
                            key={index}
                            image={{uri: item.img}}>
                            <Button
                                icon={<Icon name='code' color='#ffffff'/>}
                                backgroundColor='#03A9F4'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                onPress={() => this.viewDetails(item)}
                                title='View Details'/>
                        </Card>
                    ))
                }
            </ScrollView>
        );
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