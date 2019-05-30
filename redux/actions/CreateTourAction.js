import {CREATE_TOUR_FAILURE, CREATE_TOUR_REQUEST, CREATE_TOUR_SUCCESS} from "./types/types";
import axios from "axios";
import {SERVER_URL} from "../../constants/Server";
import firebase from 'firebase'

const createTourRequest = () => {
    return {
        type: CREATE_TOUR_REQUEST
    }
};

const createTourSuccess = (tour) => {
    return {
        type: CREATE_TOUR_SUCCESS,
        payload: tour
    }
};

const createTourFailure = (err) => {
    return {
        type: CREATE_TOUR_FAILURE,
        payload: err
    }
};

const create = async (tour) => {
    return firebase
        .database()
        .ref(`/tours/`)
        .push(tour)
};



export const createTour =  (tour) => {
    console.log(tour);
    return async (dispatch) => {
        dispatch(createTourRequest());
        try {
            await create(tour);
            dispatch(createTourSuccess(tour))
        }
        catch(exception) {
            console.log(exception)
            dispatch(createTourFailure())
        }
    }
};



