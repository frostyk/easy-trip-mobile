import {CHANGE_HOME_SCREEN_STATE} from "../actions/types/types";

const initialState = {
    search: ''
};

export const changeHomeScreenReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_HOME_SCREEN_STATE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};


