import {combineReducers} from "redux";
import {fetchCountriesReducer} from "./FetchCountriesReducer";
import {fetchPlacesReducer} from "./FetchPlacesReducer";
import {changeHomeScreenReducer} from "./ChangeHomeScreenStateReducer";
import {geocodeAddressReducer} from "./GeocodeAddressReducer";
import {fetchEstablishmentsReducer} from "./FetchEstablishmentsReducer";
import {manageEstablishmentsReducer} from "./ManageEstablishmentsStateReducer";
import {changeEstablishmentScreenReducer} from "./ChangeEstablishmentScreenStateReducer";
import {changeEstablishmentDetailsScreenReducer} from "./ChangeEstablishmentDetailsScreenStateReducer";
import {fetchEstablishmentDetailsReducer} from "./FetchEstablishmentDetailsReducer";
import {loginReducer} from "./LoginReducer";
import {logoutReducer} from "./LogoutReducer";
import {registerReducer} from "./RegisterReducer";
import {changeCreateScreenReducer} from "./ChangeCreateScreenStateReducer";
import {createTourReducer} from "./CreateTourReducer";
import {fetchToursReducer} from "./FetchToursReducer";
import {changeProfileScreenReducer} from "./ChangeProfileScreenStateReducer";
import {addToFavouriteReducer} from "./AddToFavouriteReducer";

export default combineReducers({
    countries: fetchCountriesReducer,
    places: fetchPlacesReducer,
    homeScreenState: changeHomeScreenReducer,
    geocode: geocodeAddressReducer,
    establishments: fetchEstablishmentsReducer,
    establishmentsStore: manageEstablishmentsReducer,
    establishmentScreenState: changeEstablishmentScreenReducer,
    establishmentDetailsScreenState: changeEstablishmentDetailsScreenReducer,
    establishmentDetails: fetchEstablishmentDetailsReducer,
    loginState: loginReducer,
    logoutState: logoutReducer,
    registerState: registerReducer,
    createScreenState: changeCreateScreenReducer,
    createTourState: createTourReducer,
    fetchTours: fetchToursReducer,
    profileScreenState: changeProfileScreenReducer,
    addToFavourite: addToFavouriteReducer
});