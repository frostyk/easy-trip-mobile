import {FETCH_FAVOURITES_FAILURE, FETCH_FAVOURITES_REQUEST, FETCH_FAVOURITES_SUCCESS} from "../actions/types/types";

const initialState = {
    isFetching: false,
    isSuccessful: false,
    error: '',
    list: []
};

export const fetchFavouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAVOURITES_REQUEST:
            console.log('Fetch favourite ~');
            return {
                ...state,
                isFetching: true
            };
        case FETCH_FAVOURITES_SUCCESS:
            console.log('Fetch favourite  +');
            return {
                ...state,
                isFetching: false,
                isSuccessful: true,
                list: action.payload
            };

        case FETCH_FAVOURITES_FAILURE:
            console.log('Fetch favourite  -');
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};


