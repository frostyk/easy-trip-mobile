import {human, iOSColors} from 'react-native-typography'

export default {
    rounded: {
        title: {
            ...human.subheadObject
        },
        solidStyle: {
            borderRadius: 20,
            backgroundColor: iOSColors.pink,
            height: 40
        },
        outlineStyle: {
            borderRadius: 20,
            height: 40,
            borderColor: iOSColors.pink
        }
    }
}