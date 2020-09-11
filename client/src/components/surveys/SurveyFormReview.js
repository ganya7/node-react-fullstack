import React from "react";
import { connect } from "react-redux";
import formFields from './formFields';
import _ from "lodash";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

// SurveyFormReview is receiving props that has been destructured
// history is passed as props from withRouter
const SurveyFormReview = ({ onCancel, formValues,submitSurvey,history }) => {
    /*  return (
         <div>
             <h5>Please confirm your entries</h5>
             <div>
                 <label>Survey Title</label>
                 <div>{formValues.title}</div>
             </div>
             <button className="yellow darken-3 btn-flat" onClick={onCancel}>Back</button>
         </div>
     ); */

    // const reviewFields = _.map(formFields, field => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });
    // in order submitSurvey isnt called instantly we need to wrap it up in an arrow function
    // so that the function is called when we click on submit button and not when the page 
    // loads up
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Back</button>
            <button className="green btn-flat right white-text"
                onClick={()=>submitSurvey(formValues,history)}>
                Send Survey <i className="material-icons right">email</i></button>
        </div>

    );
}

// using reduxForm connect to get the form stored values from store
// to the surveyFormReview component with mapstatetoprops
// const mapStateToProps = (state) => {
function mapStateToProps (state) {
    console.log(state);
    return {
        formValues: state.form.surveyForm.values
    };
    // the return is returned as props to SurveyFormReview component
}

// export default connect(mapStateToProps, actions)(SurveyFormReview);
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));