import {DELETE_FAVOURITE_FAILURE, DELETE_FAVOURITE_REQUEST, DELETE_FAVOURITE_SUCCESS} from "../actions/types/types";

const initialState = {
    isFetching: false,
    isSuccessful: false,
    error: ''
};

export const deleteFavouriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_FAVOURITE_REQUEST:
            console.log('Delete favourite ~');
            return {
                ...state,
                isFetching: true
            };
        case DELETE_FAVOURITE_SUCCESS:
            console.log('Delete favourite  +');
            return {
                ...state,
                isFetching: false,
                isSuccessful: true
            };

        case DELETE_FAVOURITE_FAILURE:
            console.log('Delete favourite  -');
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


