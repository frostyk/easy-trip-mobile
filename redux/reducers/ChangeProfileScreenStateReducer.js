import {CHANGE_PROFILE_SCREEN_STATE} from "../actions/types/types";

const initialState = {
    user: {}
};

export const changeProfileScreenReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PROFILE_SCREEN_STATE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};


