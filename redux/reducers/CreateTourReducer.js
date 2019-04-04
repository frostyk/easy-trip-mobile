import {CREATE_TOUR_FAILURE, CREATE_TOUR_REQUEST, CREATE_TOUR_SUCCESS} from "../actions/types/types";

const initialState = {
    isFetching: false,
    isSuccessful: false,
    error: '',
    tour: null
};

export const createTourReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TOUR_REQUEST:
            console.log('Create tour ~');
            return {
                ...state,
                isFetching: true
            };
        case CREATE_TOUR_SUCCESS:
            console.log('Create tour +');
            return {
                ...state,
                isFetching: false,
                isSuccessful: true,
                tour: action.payload
            };

        case CREATE_TOUR_FAILURE:
            console.log('Create tour -');
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


