import {FETCH_TOURS_FAILURE, FETCH_TOURS_REQUEST, FETCH_TOURS_SUCCESS} from "./types/types";
import axios from "axios";
import {SERVER_URL} from "../../constants/Server";
import {addEstablishments} from "./ManageEstablishmentsAction";
import {TOUR} from "../../constants/Google";
import firebase from 'firebase'


const fetchToursRequest = () => {
    return {
        type: FETCH_TOURS_REQUEST
    }
};

const fetchToursSuccess = (tour) => {
    return {
        type: FETCH_TOURS_SUCCESS,
        payload: tour
    }
};

const fetchToursFailure = (err) => {
    return {
        type: FETCH_TOURS_FAILURE,
        payload: err
    }
};

export const fetchTours = (place_id) => {
    return async (dispatch) => {
        dispatch(fetchToursRequest());
        try {
            return firebase
                .database()
                .ref(`/tours/`)
                .orderByChild('placeId')
                .equalTo(place_id)
                .on('value', function (snapshot) {
                    let tours = [];
                    snapshot.forEach(function(childSnapshot) {
                        tours.push(childSnapshot.val());
                    });
                    dispatch(fetchToursSuccess(tours))
                    dispatch(addEstablishments(tours, TOUR));

                })
        } catch (exception) {
            console.log(exception)
            dispatch(fetchToursFailure())
        }
    }
};


