import {ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS} from "../actions/types/types";

const initialState = {
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const addToFavouriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITE_REQUEST:
            console.log('Add to favourite ~');
            return {
                ...state,
                isFetching: true
            };
        case ADD_TO_FAVOURITE_SUCCESS:
            console.log('Add to favourite  +');
            return {
                ...state,
                isFetching: false,
                isSuccessful: true
            };

        case ADD_TO_FAVOURITE_FAILURE:
            console.log('Add to favourite  -');
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


