import {CHANGE_ESTABLISHMENT_SCREEN_STATE} from "../actions/types/types";

const initialState = {
    establishments: [],
    title: ''
};

export const changeEstablishmentScreenReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ESTABLISHMENT_SCREEN_STATE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};


