import {FETCH_PLACES_FAILURE, FETCH_PLACES_REQUEST, FETCH_PLACES_SUCCESS} from "./types/types";
import axios from "axios";
import {GOOGLE_API_KEY} from "../../constants/Google";


const fetchPlacesRequest = () => {
    return {
        type: FETCH_PLACES_REQUEST
    }
};

const fetchPlacesSuccess = (payload) => {
    return {
        type: FETCH_PLACES_SUCCESS,
        payload
    }
};

const fetchPlacesFailure = (err) => {
    return {
        type: FETCH_PLACES_FAILURE,
        payload: err
    }
};

const fetch = (name) => {
   return axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${name}&types=(regions)&key=${GOOGLE_API_KEY}`);
};


export const fetchPlaces = (name) => {
    return (dispatch) => {
        dispatch(fetchPlacesRequest());
        if (name.length < 3) {
            dispatch(fetchPlacesSuccess([]));
        } else {
            fetch(name)
                .then(res => {
                    dispatch(fetchPlacesSuccess(res.data.predictions));
                })
                .catch(err => {
                    dispatch(fetchPlacesFailure(err))
                })
        }
    }
};

export const cleanPlaces = () => {
    return (dispatch) => {
        dispatch(fetchPlacesSuccess([]));
    }
};

