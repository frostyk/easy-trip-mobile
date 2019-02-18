import React from 'react';
import {Divider, ListItem, SearchBar} from "react-native-elements";
import {Platform, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import * as actions from "../redux/actions";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";

class Autocomplete extends React.Component {

    updateSearch = search => {
        this.props.changeHomeScreenState({search});
        this.props.fetchCountries(search);
    };

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    lightTheme={true}
                    placeholder="Country..."
                    onChangeText={this.updateSearch}
                    value={this.props.state.search}
                />
                <View >
                    {
                        this.props.countries.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.name}
                                // leftIcon={{ name: item.icon }}
                            />
                        ))
                    }
                    <Divider />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        width: widthPercentageToDP('100%'),
        zIndex: 100
    },
    listStyle: {
        borderBottomWidth: 1
    }
});


const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        state: state.homeScreenState,
        countries: state.countries.countries
    };
};

export default connect(mapStateToProps, actions)(Autocomplete)