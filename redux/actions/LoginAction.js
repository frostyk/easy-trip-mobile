import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from "./types/types";
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

const fetchLogin = (user) => {
    return axios.post(`${SERVER_URL}/api/authenticate`, user);
};

export const login = (user) => {
    return (dispatch) => {
        dispatch(loginRequest());
        fetchLogin(user)
            .then(res => {
                if (res.data.id_token) {
                    dispatch(loginSuccess());
                    dispatch(onSignIn(res.data.id_token));
                } else {
                    dispatch(loginFailure(`Can't fetch id_token`))
                }
            })
            .catch(err => {
                dispatch(loginFailure(err))
            })
    }
};



