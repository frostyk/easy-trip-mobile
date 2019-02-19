import {FETCH_PLACES_FAILURE, FETCH_PLACES_REQUEST, FETCH_PLACES_SUCCESS} from "../actions/types/types";

const initialState = {
    places: [],
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const fetchPlacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_PLACES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccessful: true,
                places: action.payload
            };

        case FETCH_PLACES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


