import {REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_RESET, LOGIN_RESET} from "./types/types";
import axios from "axios";
import {SERVER_URL} from "../../constants/Server";
import {onSignIn} from "../../auth/auth";
import {login} from "./LoginAction";


const registerRequest = () => {
    return {
        type: REGISTER_REQUEST
    }
};

const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS
    }
};

const registerFailure = (err) => {
    return {
        type: REGISTER_FAILURE,
        payload: err
    }
};


const registerReset = () => {
    return {
        type: REGISTER_RESET
    }
};

const fetchRegister = (user) => {
    return axios.post(`${SERVER_URL}/api/register`, user);
};

export const register = (user) => {
    return (dispatch) => {
        dispatch(registerRequest());
        fetchRegister(user)
            .then( res => {
                dispatch(registerSuccess());
                dispatch(registerReset());
            })
            .catch(err => {
                console.log(err);
                dispatch(registerFailure(err))
            })
    }
};



