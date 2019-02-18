import {FETCH_COUNTRIES_FAILURE, FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS} from "./types/types";
import axios from "axios";


const FETCH_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/name/';


const fetchCountriesRequest = () => {
    return {
        type: FETCH_COUNTRIES_REQUEST
    }
};

const fetchCountriesSuccess = (res) => {
    return {
        type: FETCH_COUNTRIES_SUCCESS,
        payload: res
    }
};

const fetchCountriesFailure = (err) => {
    return {
        type: FETCH_COUNTRIES_FAILURE,
        payload: err
    }
};

const fetch = (name) => {
   return axios.get(`${FETCH_COUNTRIES_URL}${name}`);
} ;

export const fetchCountries = (name) => {
    return (dispatch) => {
        dispatch(fetchCountriesRequest());
        fetch(name)
            .then(res => {
                dispatch(fetchCountriesSuccess(res));
            })
            .catch(err => dispatch(fetchCountriesFailure(err)))
    }
};


