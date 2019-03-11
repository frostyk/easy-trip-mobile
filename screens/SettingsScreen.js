import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";

import {connect} from "react-redux";
import * as actions from "../redux/actions";

class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Button
                    title={'Logout'}
                    onPress={this._logoutAsync}
                />
            </ScrollView>
        );
    }

    componentDidUpdate() {
        if (this.props.logoutState.isSuccessful) {
            this.props.navigation.navigate('AuthLoading');
        }
    }

    _logoutAsync = () => {
        this.props.logout();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        logoutState: state.logoutState
    };
};

export default connect(mapStateToProps, actions)(SettingsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
