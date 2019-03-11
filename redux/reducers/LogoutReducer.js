import {LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../actions/types/types";

const initialState = {
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const logoutReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGOUT_REQUEST:
            console.log('Logout ~');

            return {
                ...state,
                isFetching: true
            };
        case LOGOUT_SUCCESS:
            console.log('Logout +');
            return {
                ...state,
                isFetching: false,
                isSuccessful: true
            };

        case LOGOUT_FAILURE:
            console.log('Logout -');

            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


