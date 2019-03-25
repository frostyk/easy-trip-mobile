import {
    LOGIN_RESET,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_RESET,
    REGISTER_SUCCESS
} from "../actions/types/types";

const initialState = {
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccessful: true
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };

        case REGISTER_RESET:
            return {
                isFetching: false,
                isSuccessful: false,
                error: ''
            };
        default:
            return state;
    }
};


