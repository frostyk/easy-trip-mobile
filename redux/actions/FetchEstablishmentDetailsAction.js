import axios from "axios";
import {GOOGLE_API_KEY} from "../../constants/Google";
import {
    FETCH_ESTABLISHMENT_DETAILS_FAILURE,
    FETCH_ESTABLISHMENT_DETAILS_REQUEST,
    FETCH_ESTABLISHMENT_DETAILS_SUCCESS
} from "./types/types";
import {changeEstablishmentDetailsScreenState} from "./EstablishmentDetailsScreenAction";


const fetchEstablishmentDetailsRequest = () => {
    return {
        type: FETCH_ESTABLISHMENT_DETAILS_REQUEST
    }
};

const fetchEstablishmentDetailsSuccess = (payload) => {
    return {
        type: FETCH_ESTABLISHMENT_DETAILS_SUCCESS,
        payload
    }
};

const fetchEstablishmentDetailsFailure = (err) => {
    return {
        type: FETCH_ESTABLISHMENT_DETAILS_FAILURE,
        payload: err
    }
};


const fetch = (placeId) => {
    return axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,formatted_phone_number,review,international_phone_number,opening_hours,website,address_component,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,user_ratings_total,utc_offset,vicinity&key=${GOOGLE_API_KEY}`);
};


export const fetchEstablishmentDetails = (placeId) => {
    return (dispatch) => {
        dispatch(fetchEstablishmentDetailsRequest());
        fetch(placeId)
            .then(res => {
                dispatch(fetchEstablishmentDetailsSuccess(res.data.result));
                dispatch(changeEstablishmentDetailsScreenState({establishment: res.data.result}));
            })
            .catch(err => {
                dispatch(fetchEstablishmentDetailsFailure(err))
            })
    }
};



