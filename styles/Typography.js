import {human, iOSColors, systemWeights} from 'react-native-typography'

export default {
    h1: {
        ...human.largeTitleObject,
        color: iOSColors.pink,
        ...systemWeights.bold
    },
    title: {
        ...human.title1Object
    },
    title2: {
        ...human.title2Object
    },
    title3: {
        ...human.title3Object
    },
    headline: {
        ...human.headlineObject
    },
    subhead: {
        ...human.subheadObject
    },
}