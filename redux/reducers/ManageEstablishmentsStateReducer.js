import {ADD_ESTABLISHMENTS, CLEAN_ESTABLISHMENTS, DELETE_ESTABLISHMENT} from "../actions/types/types";
import {CAFE, MUSEUM, NIGHT_CLUB, PARK, RESTAURANT, TOUR, ZOO} from "../../constants/Google";

const initialState = {
    restaurants: [],
    museums: [],
    nightClubs: [],
    zoos: [],
    cafes: [],
    parks: [],
    tours: [],
    establishments: []
};

export const manageEstablishmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ESTABLISHMENTS:
          switch (action.payload.type) {
              case RESTAURANT:
                  return {
                      ...state,
                      restaurants: [...state.restaurants, ...action.payload.establishments]
                  };
              case MUSEUM:
                  return {
                      ...state,
                      museums: [...state.museums, ...action.payload.establishments]
                  };
              case NIGHT_CLUB:
                  return {
                      ...state,
                      nightClubs: [...state.nightClubs, ...action.payload.establishments]
                  };
              case ZOO:
                  return {
                      ...state,
                      zoos: [...state.zoos, ...action.payload.establishments]
                  };
              case CAFE:
                  return {
                      ...state,
                      cafes: [...state.cafes, ...action.payload.establishments]
                  };
              case PARK:
                  return {
                      ...state,
                      parks: [...state.cafes, ...action.payload.establishments]
                  };
              case TOUR:
                  return {
                      ...state,
                      tours: [...state.tours, ...action.payload.establishments]
                  };
              default:
                  return {
                      ...state,
                      establishments: [...state.establishments, ...action.payload.establishments]
                  };
          }
        case DELETE_ESTABLISHMENT:
            return {
                ...state,
                establishments: state.establishments.filter(item => item !== action.payload)
            };
        case CLEAN_ESTABLISHMENTS:
            return {
                ...state,
                establishments: []
            };
        default:
            return state;
    }
};


