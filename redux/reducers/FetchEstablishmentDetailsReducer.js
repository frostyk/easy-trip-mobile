import {
    FETCH_ESTABLISHMENT_DETAILS_FAILURE,
    FETCH_ESTABLISHMENT_DETAILS_REQUEST,
    FETCH_ESTABLISHMENT_DETAILS_SUCCESS
} from "../actions/types/types";

const initialState = {
    establishment: {},
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const fetchEstablishmentDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ESTABLISHMENT_DETAILS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_ESTABLISHMENT_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccessful: true,
                establishment: action.payload
            };

        case FETCH_ESTABLISHMENT_DETAILS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


