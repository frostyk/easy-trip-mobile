import {combineReducers} from "redux";
import {fetchCountriesReducer} from "./FetchCountriesReducer";

export default combineReducers({
    countries: fetchCountriesReducer
});