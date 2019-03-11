import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS} from "../actions/types/types";

const initialState = {
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            console.log('Login ~');
            return {
                ...state,
                isFetching: true
            };
        case LOGIN_SUCCESS:
            console.log('Login +');
            return {
                ...state,
                isFetching: false,
                isSuccessful: true
            };

        case LOGIN_FAILURE:
            console.log('Login -');
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case LOGIN_RESET:
            return {
                isFetching: false,
                isSuccessful: false,
                error: ''
            };
        default:
            return state;
    }
};


