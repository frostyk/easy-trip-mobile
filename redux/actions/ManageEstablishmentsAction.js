import {ADD_ESTABLISHMENTS, CLEAN_ESTABLISHMENTS} from "./types/types";

export const addEstablishments = (establishments, type) => {
    return {
        type: ADD_ESTABLISHMENTS,
        payload: {establishments, type}
    }
};

export const cleanEstablishments = () => {
    return {
        type: CLEAN_ESTABLISHMENTS
    }
};

export const deleteEstablishment = (establishment) => {
    return {
        type: CLEAN_ESTABLISHMENTS,
        payload: establishment
    }
};


