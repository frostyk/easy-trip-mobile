import {
    ADD_TO_FAVOURITE_FAILURE,
    ADD_TO_FAVOURITE_REQUEST,
    ADD_TO_FAVOURITE_SUCCESS, FETCH_FAVOURITES_FAILURE,
    FETCH_FAVOURITES_REQUEST, FETCH_FAVOURITES_SUCCESS
} from "./types/types";
import firebase from 'firebase'

const fetchFavouritesRequest = () => {
    return {
        type: FETCH_FAVOURITES_REQUEST
    }
};

const fetchFavouritesSuccess = (places) => {
    return {
        type: FETCH_FAVOURITES_SUCCESS,
        payload: places
    }
};

const fetchFavouritesFailure = (err) => {
    return {
        type: FETCH_FAVOURITES_FAILURE,
        payload: err
    }
};


export const fetchFavourites = () => {
    return async (dispatch) => {
        dispatch(fetchFavouritesRequest());
        try {
            let uid = firebase.auth().currentUser.uid;
            return firebase
                .database()
                .ref(`/favourites/`)
                .orderByChild('uid')
                .equalTo(uid)
                .on('value', function (snapshot) {
                    let places = [];
                    snapshot.forEach(function(childSnapshot) {
                        places.push({...childSnapshot.val(), id: childSnapshot.key});
                    });
                    dispatch(fetchFavouritesSuccess(places))
                })
        } catch (exception) {
            console.log(exception)
            dispatch(fetchFavouritesFailure())
        }
    }
};



