import {CHANGE_CREATE_SCREEN_STATE} from "./types/types";

export const changeCreateScreenState = (state) => {
    return {
        type: CHANGE_CREATE_SCREEN_STATE,
        payload: state
    }
};


