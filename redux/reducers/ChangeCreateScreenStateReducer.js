import {CHANGE_CREATE_SCREEN_STATE} from "../actions/types/types";

const initialState = {
    title: '',
    description: '',
    location: '',
    images: [],
    screenState: 1,
    locationsListVisible: true,
    coords: {lat: 49.83826, lng: 24.02324}
};

export const changeCreateScreenReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CREATE_SCREEN_STATE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};


