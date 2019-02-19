import {GEOCODE_ADDRESS_FAILURE, GEOCODE_ADDRESS_REQUEST, GEOCODE_ADDRESS_SUCCESS} from "../actions/types/types";

const initialState = {
    results: [],
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const geocodeAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GEOCODE_ADDRESS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case GEOCODE_ADDRESS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccessful: true,
                results: action.payload
            };

        case GEOCODE_ADDRESS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


