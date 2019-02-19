import {FETCH_ESTABLISHMENTS_FAILURE, FETCH_ESTABLISHMENTS_REQUEST, FETCH_ESTABLISHMENTS_SUCCESS} from "../actions/types/types";

const initialState = {
    establishments: [],
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const fetchEstablishmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ESTABLISHMENTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_ESTABLISHMENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccessful: true,
                establishments: action.payload
            };

        case FETCH_ESTABLISHMENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


