import {CHANGE_ESTABLISHMENT_DETAILS_SCREEN_STATE} from "./types/types";

export const changeEstablishmentDetailsScreenState = (state) => {
    return {
        type: CHANGE_ESTABLISHMENT_DETAILS_SCREEN_STATE,
        payload: state
    }
};


