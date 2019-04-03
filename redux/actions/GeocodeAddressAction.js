import {GEOCODE_ADDRESS_FAILURE, GEOCODE_ADDRESS_REQUEST, GEOCODE_ADDRESS_SUCCESS} from "./types/types";
import axios from "axios";
import {GOOGLE_API_KEY} from "../../constants/Google";
import {fetchPlacesByLocation} from "./FetchPlacesAction";
import {fetchEstablishmentsNearby} from "./FetchEstablishmentsAction";
import {changeCreateScreenState} from "./CreateScreenAction";


const geocodeAddressRequest = () => {
    return {
        type: GEOCODE_ADDRESS_REQUEST
    }
};

const geocodeAddressSuccess = (payload) => {
    return {
        type: GEOCODE_ADDRESS_SUCCESS,
        payload
    }
};

const geocodeAddressFailure = (err) => {
    return {
        type: GEOCODE_ADDRESS_FAILURE,
        payload: err
    }
};

const geocodePlaceId = (placeId) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`);
};

export const geocodeAddressByPlaceId = (placeId) => {
    return (dispatch) => {
        dispatch(geocodeAddressRequest());
        geocodePlaceId(placeId)
            .then(res => {
                dispatch(geocodeAddressSuccess(res.data.results));
            })
            .catch(err => {
                dispatch(geocodeAddressFailure(err))
            })
    }
};

export const geocodeAddressByPlaceIdForTour = (placeId, map) => {
    return (dispatch) => {
        dispatch(geocodeAddressRequest());
        geocodePlaceId(placeId)
            .then(res => {
                const loc = res.data.results[0].geometry.location;
                dispatch(changeCreateScreenState({coords: {lat: loc.lat, lng: loc.lng}}));
                map.animateToRegion({
                    latitude: loc.lat,
                    longitude: loc.lng,
                    latitudeDelta: 0.0082,
                    longitudeDelta: 0.0021,
                }, 1000)
            })
            .catch(err => {
                dispatch(geocodeAddressFailure(err))
            })
    }
};

export const geocodeAddressByPlaceIdAndFindPlaces = (placeId, placeType, radius) => {
    return (dispatch) => {
        dispatch(geocodeAddressRequest());
        geocodePlaceId(placeId)
            .then(res => {
                dispatch(geocodeAddressSuccess(res.data.results));
                dispatch(fetchEstablishmentsNearby(res.data.results[0], placeType, radius));
            })
            .catch(err => {
                dispatch(geocodeAddressFailure(err))
            })
    }
};



