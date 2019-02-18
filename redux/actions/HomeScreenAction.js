import {CHANGE_HOME_SCREEN_STATE} from "./types/types";

export const changeHomeScreenState = (state) => {
    return {
        type: CHANGE_HOME_SCREEN_STATE,
        payload: state
    }
};


