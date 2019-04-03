import {human, iOSColors} from 'react-native-typography'
import Typography from "./Typography";

export default {
    rounded: {
        inputContainerStyle: {
            borderWidth: 1,
            borderColor: iOSColors.gray,
            borderRadius: 20,
            paddingLeft: 10,
            marginBottom: 20,
            marginTop: 5,
        },
        areaContainerStyle: {
            borderWidth: 1,
            borderColor: iOSColors.gray,
            borderRadius: 20,
            paddingLeft: 10,
            marginBottom: 20,
            marginTop: 5,
            height: 150
        },
        inputStyle: {
            ...human.footnoteObject,
            color: iOSColors.black
        },
        labelStyle: {
            ...Typography.headline,
            fontSize: 14,
            color: iOSColors.pink,
            fontWeight: '300'
        }
    }
}