import {AsyncStorage} from "react-native";
import axios from "axios";

export const BEARER_KEY = "auth-key";

export const onSignIn = (key) => {
    console.log(`Sign int with key ${key}`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;
    return AsyncStorage.setItem(BEARER_KEY, JSON.stringify(key));
};


export const onSignOut = () => {
    axios.defaults.headers.common['Authorization'] = ``;
    return AsyncStorage.removeItem(BEARER_KEY)
};

export const isSignedIn = async () => {
    try {
        const token = await AsyncStorage.getItem(BEARER_KEY);
        const parsedToken = JSON.parse(token);
        return parsedToken !== null;
    } catch (e) {
        console.log(e);
    }
};