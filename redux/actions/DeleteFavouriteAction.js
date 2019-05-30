import {
} from "./types/types";
import firebase from 'firebase'
import {DELETE_FAVOURITE_REQUEST} from "./types/types";
import {DELETE_FAVOURITE_SUCCESS} from "./types/types";
import {DELETE_FAVOURITE_FAILURE} from "./types/types";

const deleteFavouriteRequest = () => {
    return {
        type: DELETE_FAVOURITE_REQUEST
    }
};

const deleteFavouriteSuccess = () => {
    return {
        type: DELETE_FAVOURITE_SUCCESS
    }
};

const deleteFavouriteFailure = (err) => {
    return {
        type: DELETE_FAVOURITE_FAILURE,
        payload: err
    }
};


export const deleteFavourite = (id) => {
    return async (dispatch) => {
        dispatch(deleteFavouriteRequest());
        try {
            return firebase
                .database()
                .ref(`/favourites/${id}`)
                .remove().then(res => {
                    console.log(res);
                    dispatch(deleteFavouriteSuccess())
                }).catch(err => dispatch(deleteFavouriteFailure(err)))
        } catch (exception) {
            console.log(exception)
            dispatch(deleteFavouriteFailure())
        }
    }
};



