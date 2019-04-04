import {CREATE_TOUR_FAILURE, CREATE_TOUR_REQUEST, CREATE_TOUR_SUCCESS} from "./types/types";
import axios from "axios";
import {SERVER_URL} from "../../constants/Server";

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
    return axios.post(`${SERVER_URL}/api/tours`, tour);
};



export const createTour =  (tour) => {
    return async (dispatch) => {
        dispatch(createTourRequest());
        try {
            const createdTour = await create(tour);
            dispatch(createTourSuccess(createdTour))
        }
        catch(exception) {
            dispatch(createTourFailure())
        }
    }
};



