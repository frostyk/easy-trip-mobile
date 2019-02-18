import React from 'react';
import {Platform, ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import {PricingCard, SearchBar} from 'react-native-elements';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor (props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    updateSearch = search => {
        console.log(search);
        this.setState({search: search})
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <ScrollView>
                        <SearchBar
                            lightTheme={true}
                            placeholder="Type Here..."
                            onChangeText={this.updateSearch}
                            value={this.state.search}
                        />

                        <PricingCard
                            color="#4f9deb"
                            title="Get a personalized plan"
                            info={['A complete day-by-day itinerary based on your preferences']}
                            button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
                        />
                        <PricingCard
                            color="#4f9deb"
                            title="Customize it"
                            info={['Refine your plan. We\'ll find the best routes']}
                            button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
                        />
                        <PricingCard
                            color="#4f9deb"
                            title="Manage it"
                            info={['Everything in one place.Everyone on the same page']}
                            button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
});
