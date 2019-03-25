import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {iOSColors} from "react-native-typography";
import {widthPercentageToDP} from "react-native-responsive-screen";
import Typography from "../styles/Typography";

export class SectionDivider extends React.Component {
    render() {
        return (
            <View style={styles.divider}>
                <Text style={[Typography.headline, styles.title]}>{'\t' + this.props.title}</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    divider: {
        height: 40,
        backgroundColor: iOSColors.lightGray,
        width: widthPercentageToDP('100%'),
        justifyContent: 'center'
    },
    title: {
        color: iOSColors.gray
    }
});
