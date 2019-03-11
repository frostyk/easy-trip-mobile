import {LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "./types/types";
import {AsyncStorage} from "react-native";
import {onSignOut} from "../../auth/auth";



const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    }
};

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};

const logoutFailure = (err) => {
    return {
        type: LOGOUT_FAILURE,
        payload: err
    }
};



export const logout =  () => {
    return async (dispatch) => {
        dispatch(logoutRequest());
        try {
            await onSignOut();
            dispatch(logoutSuccess())
        }
        catch(exception) {
            dispatch(logoutFailure())
        }
    }
};



