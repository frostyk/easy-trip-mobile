import {FETCH_TOURS_FAILURE, FETCH_TOURS_REQUEST, FETCH_TOURS_SUCCESS} from "./types/types";
import axios from "axios";
import {SERVER_URL} from "../../constants/Server";
import {addEstablishments} from "./ManageEstablishmentsAction";
import {TOUR} from "../../constants/Google";

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

const fetch = async (placeID) => {
    return axios.get(`${SERVER_URL}/api/tour/${placeID}`);
};


export const fetchTours = (placeId) => {
    console.log('Fetch tours by placeId ' + placeId);
    return async (dispatch) => {
        dispatch(fetchToursRequest());
        try {
            const res = await fetch(placeId);
            dispatch(fetchToursSuccess(res.data.content));
            dispatch(addEstablishments(res.data.content, TOUR));
        } catch (exception) {
            console.log(exception);
            dispatch(fetchToursFailure())
        }
    }
};



