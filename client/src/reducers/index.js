import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
    //keys are the same as the inside of the state object
    auth: authReducer
});