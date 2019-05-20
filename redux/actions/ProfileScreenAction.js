import {CHANGE_PROFILE_SCREEN_STATE} from "./types/types";

export const changeProfileScreenState = (state) => {
    return {
        type: CHANGE_PROFILE_SCREEN_STATE,
        payload: state
    }
};


