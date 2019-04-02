import {human, iOSColors} from 'react-native-typography'

export default {
    rounded: {
        inputContainerStyle: {
            borderWidth: 1,
            borderColor: iOSColors.gray,
            borderRadius: 20,
            paddingLeft: 10,
            marginVertical: 20
        },
        inputStyle: {
            ...human.footnoteObject,
            color: iOSColors.black
        }
    }
}