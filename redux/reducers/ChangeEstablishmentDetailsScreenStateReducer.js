import {CHANGE_ESTABLISHMENT_DETAILS_SCREEN_STATE} from "../actions/types/types";

const initialState = {
    establishment: null,
    tour: null,
    selectedIndex: 0
};

export const changeEstablishmentDetailsScreenReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ESTABLISHMENT_DETAILS_SCREEN_STATE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};


