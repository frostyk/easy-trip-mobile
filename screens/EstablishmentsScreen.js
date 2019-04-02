import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {Button, Card, Icon} from "react-native-elements";
import {GOOGLE_API_KEY} from "../constants/Google";

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
                            title={item.name}
                            image={{uri: item.img}}>
                            <Text style={{marginBottom: 10}}>
                                {item.vicinity}
                            </Text>
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
        this.props.fetchEstablishmentDetails(item.place_id);
        this.props.navigation.navigate('EstablishmentDetails');
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