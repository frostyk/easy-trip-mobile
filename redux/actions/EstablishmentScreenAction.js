import {CHANGE_ESTABLISHMENT_SCREEN_STATE} from "./types/types";

export const changeEstablishmentScreenState = (state) => {
    return {
        type: CHANGE_ESTABLISHMENT_SCREEN_STATE,
        payload: state
    }
};


