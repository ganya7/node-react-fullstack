// shows a form for user to add input

import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from './formFields';

/* 
const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    // { label: 'Survey Title', name: 'title' , noValueError: "You must fill survey title."},
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' },
];
 */
class SurveyForm extends Component {
    /* renderFields() {
        return (
            <div>
                <Field label="Survey Title" type="text" component={SurveyField} name="title" />
                <Field label="Subject Line" type="text" component={SurveyField} name="subject" />
                <Field label="Email Body" type="text" component={SurveyField} name="body" />
                <Field label="Recipient List" type="text" component={SurveyField} name="emails" />
            </div>
        );
    } */

    renderFields() {
        // return _.map(formFields, field =>{})
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field label={label} type="text" component={SurveyField} name={name} key={name} />
            );
        });
    }

    render() {
        // we are not invoking onSurveySubmit therefore we dont have parantheses after onSurveySubmit
        // if parantheses are added then, js will instantly run/ call that callback as soon as it encounters
        // that line of code
        return (
            <div>

                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Submit
                        <i className="material-icons right">done</i>
                    </button>

                </form>
            </div>
        );
    }

}

function validate(values) {
    const errors = {};
    /* if (!errors.title) {
        errors.title = 'You must provide a title';
    } */

    errors.recipients = validateEmails(values.recipients || '');
    _.each(formFields, ({ name }) => {
        // _.each(formFields, ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
            // errors[name] = noValueError; // customized field error message solution
        }
    });



    return errors;
}


export default reduxForm({
    // key is the option / property of reduxForm that needs to be passed
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false     // default true
})(SurveyForm);
