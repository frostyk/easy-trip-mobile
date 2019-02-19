import {combineReducers} from "redux";
import {fetchCountriesReducer} from "./FetchCountriesReducer";
import {fetchPlacesReducer} from "./FetchPlacesReducer";
import {changeHomeScreenReducer} from "./ChangeHomeScreenStateReducer";

export default combineReducers({
    countries: fetchCountriesReducer,
    places: fetchPlacesReducer,
    homeScreenState: changeHomeScreenReducer
});