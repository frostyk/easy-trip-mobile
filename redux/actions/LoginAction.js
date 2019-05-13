import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_RESET} from "./types/types";
import axios from "axios";
import {SERVER_URL} from "../../constants/Server";
import {onSignIn} from "../../auth/auth";


const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
};

const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
};

const loginFailure = (err) => {
    return {
        type: LOGIN_FAILURE,
        payload: err
    }
};
const loginReset = () => {
    return {
        type: LOGIN_RESET
    }
};



export const googleLogin = () => {
    return (dispatch) => {
        dispatch(loginSuccess())
    }
};



