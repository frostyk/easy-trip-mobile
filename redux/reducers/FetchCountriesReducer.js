import {FETCH_COUNTRIES_FAILURE, FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS} from "../actions/types/types";

const initialState = {
    countries: [],
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const fetchCountriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRIES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccessful: true,
                countries: action.payload
            };

        case FETCH_COUNTRIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


