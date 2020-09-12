import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as reduxForm } from "redux-form";
import surveysReducer from "./surveysReducer";

export default combineReducers({
    //keys are the same as the inside of the state object
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});