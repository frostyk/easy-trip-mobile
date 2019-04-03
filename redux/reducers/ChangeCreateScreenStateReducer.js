import {CHANGE_CREATE_SCREEN_STATE} from "../actions/types/types";

const initialState = {
    title: '',
    description: '',
    images: [],
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


