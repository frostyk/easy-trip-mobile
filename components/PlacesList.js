import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {iOSColors} from "react-native-typography";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import PropTypes from "prop-types";
import {Card, Tile} from "react-native-elements";

export class PlacesList extends React.Component {

    renderItem = (item) => {
        return (
            <Card id={item.id}>
                <Tile
                    id={item.id}
                    imageSrc={{uri: item.img}}
                    title={item.name}
                    featured
                    onPress={() => this.props.onClick(item)}
                    caption={item.vicinity}
                    width={widthPercentageToDP('85%')}
                    height={heightPercentageToDP('25%')}
                >
                </Tile>
            </Card>
        )
    }


    render() {
        return (
            <FlatList
                data={this.props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => this.renderItem(item)}
            />
        )
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

PlacesList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func
}
