import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Typography from "../styles/Typography";
import {Icon, Image} from "react-native-elements";
import {widthPercentageToDP} from "react-native-responsive-screen";
import PropTypes from 'prop-types';
import {iOSColors} from "react-native-typography";

export class List extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.headerSection}>
                    <Text style={styles.listHeader}> {this.props.title} </Text>
                    <Icon
                        reverse
                        name='chevron-right'
                        color={iOSColors.gray}
                        size={15}
                        onPress={this.props.onIconClick}
                         />
                </View>
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.props.data.map((item, i) => {
                            return (
                                <View key={i} style={styles.listWrapper}>
                                    <Image
                                        source={{uri: item.img}}
                                        style={styles.listImage}
                                    />
                                    <Text style={styles.listItem}>{item.name}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    listImage: {
        width: widthPercentageToDP('50%'),
        height: 130,
        borderRadius: 10
    },
    listItem: {
        ...Typography.title3,
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10
    },
    listHeader: {
        ...Typography.title,
        marginTop: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 24,
        fontWeight: '600'
    },

    listWrapper: {
        paddingHorizontal: 15
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    onIconClick: PropTypes.func.isRequired
}
