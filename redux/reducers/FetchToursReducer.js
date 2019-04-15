import {CREATE_TOUR_FAILURE, CREATE_TOUR_REQUEST, CREATE_TOUR_SUCCESS} from "../actions/types/types";

const initialState = {
    isFetching: false,
    isSuccessful: false,
    error: '',
    tours: []
};

export const fetchToursReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TOUR_REQUEST:
            console.log('Fetch tours ~');
            return {
                ...state,
                isFetching: true
            };
        case CREATE_TOUR_SUCCESS:
            console.log('Fetch tours +');
            return {
                ...state,
                isFetching: false,
                isSuccessful: true,
                tours: action.payload
            };

        case CREATE_TOUR_FAILURE:
            console.log('CreaFetchte tours -');
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


