import React from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {PricingCard} from 'react-native-elements';
import Autocomplete from "../components/Autocomplete";


class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <Autocomplete/>
                    <ScrollView>
                        <View style={styles.contentContainer}>
                            <PricingCard
                                color="#4f9deb"
                                title="Get a personalized plan"
                                info={['A complete day-by-day itinerary based on your preferences']}
                                button={{title: 'GET STARTED', icon: 'flight-takeoff'}}
                            />
                            <PricingCard
                                color="#4f9deb"
                                title="Customize it"
                                info={['Refine your plan. We\'ll find the best routes']}
                                button={{title: 'GET STARTED', icon: 'flight-takeoff'}}
                            />
                            <PricingCard
                                color="#4f9deb"
                                title="Manage it"
                                info={['Everything in one place.Everyone on the same page']}
                                button={{title: 'GET STARTED', icon: 'flight-takeoff'}}
                            />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        paddingTop: 50,
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

export default HomeScreen;