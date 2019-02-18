import {combineReducers} from "redux";
import {fetchCountriesReducer} from "./FetchCountriesReducer";
import {changeHomeScreenReducer} from "./ChangeHomeScreenStateReducer";

export default combineReducers({
    countries: fetchCountriesReducer,
    homeScreenState: changeHomeScreenReducer
});