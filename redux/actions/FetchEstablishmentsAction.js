import {FETCH_ESTABLISHMENTS_FAILURE, FETCH_ESTABLISHMENTS_REQUEST, FETCH_ESTABLISHMENTS_SUCCESS} from "./types/types";
import axios from "axios";
import {GOOGLE_API_KEY} from "../../constants/Google";


const fetchEstablishmentsRequest = () => {
    return {
        type: FETCH_ESTABLISHMENTS_REQUEST
    }
};

const fetchEstablishmentsSuccess = (payload) => {
    return {
        type: FETCH_ESTABLISHMENTS_SUCCESS,
        payload
    }
};

const fetchEstablishmentsFailure = (err) => {
    return {
        type: FETCH_ESTABLISHMENTS_FAILURE,
        payload: err
    }
};


const fetch = (request) => {
    const {lat, lng, radius, type} = request;
    return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`);
};



export const fetchEstablishmentsNearby = (location, placeType, radius) => {
    let requestObject = createRequestObject(location, placeType, radius);
    console.log(requestObject);
    return (dispatch) => {
        dispatch(fetchEstablishmentsRequest());
        fetch(requestObject)
            .then(res => {
                console.log(res.data);
                dispatch(fetchEstablishmentsSuccess(res.data.results));
            })
            .catch(err => {
                dispatch(fetchEstablishmentsFailure(err))
            })
    }
};

export const cleanEstablishments = () => {
    return (dispatch) => {
        dispatch(fetchEstablishmentsSuccess([]));
    }
};

const createRequestObject = (location, type, radius) => {
    let req = {};
    req.lat = location.geometry.location.lat;
    req.lng = location.geometry.location.lng;
    req.radius = radius;
    req.type = type;
    return req;
};


