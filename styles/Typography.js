import {human, iOSColors, systemWeights} from 'react-native-typography'

export default {
    largeTitle: {
        ...human.largeTitleObject,
        color: iOSColors.green,
        ...systemWeights.bold
    }
}