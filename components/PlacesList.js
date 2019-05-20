import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {iOSColors} from "react-native-typography";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import PropTypes from "prop-types";
import {Card, Icon, Tile} from "react-native-elements";

export class PlacesList extends React.Component {

    renderItem = (item) => {
        return (
            <Card id={item.id}>
                <View>
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
                    <Icon onPress={() => this.props.addToFavourite(item)}  iconStyle={{position: 'absolute', bottom: 15, right: 10}} color={'#fff'} size={30} type='material-community' name='heart-outline'/>
                    {/*<Icon color={iOSColors.white} onPress={this.props.removeFavourite}   iconStyle={{position: 'absolute', bottom: 15, right: 10}} size={30} type='material-community' name='heart'/>*/}
                </View>
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
    onClick: PropTypes.func,
    addToFavourite: PropTypes.func
}
