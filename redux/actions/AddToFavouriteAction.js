import {ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS} from "./types/types";
import firebase from 'firebase'

const addToFavouriteRequest = () => {
    return {
        type: ADD_TO_FAVOURITE_REQUEST
    }
};

const addToFavouriteSuccess = () => {
    return {
        type: ADD_TO_FAVOURITE_SUCCESS
    }
};

const addToFavouriteFailure = (err) => {
    return {
        type: ADD_TO_FAVOURITE_FAILURE,
        payload: err
    }
};

const add = async (place) => {
    let id = place.id;
    delete place.id;
    Object.keys(place).forEach(key => place[key] === undefined && delete place[key])
    return firebase
        .database()
        .ref(`/favourites/${id}`)
        .set({...place, uid: firebase.auth().currentUser.uid})
};


export const addToFavourite = (place) => {
    return async (dispatch) => {
        dispatch(addToFavouriteRequest());
        try {
            await add(place);
            dispatch(addToFavouriteSuccess())
        } catch (exception) {
            console.log(exception)
            dispatch(addToFavouriteFailure())
        }
    }
};



