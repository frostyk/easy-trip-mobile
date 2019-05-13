import {AsyncStorage} from "react-native";
import axios from "axios";
import firebase from 'firebase'

export const BEARER_KEY = "auth-key";

export const onSignIn = (key) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;
    return AsyncStorage.setItem(BEARER_KEY, JSON.stringify(key));
};


export const onSignOut = async () => {
    axios.defaults.headers.common['Authorization'] = ``;
    return AsyncStorage.removeItem(BEARER_KEY)
};
