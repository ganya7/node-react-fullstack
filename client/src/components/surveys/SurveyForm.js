// shows a form for user to add input

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

class SurveyForm extends Component {
    renderFields() {
        return (
            <div>
                <Field label="Survey Title" type="text" component={SurveyField} name="title" />
                <Field label="Subject Line" type="text" component={SurveyField} name="subject" />
                <Field label="Email Body" type="text" component={SurveyField} name="body" />
                <Field label="Recipient List" type="text" component={SurveyField} name="emails" />
            </div>
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
                SurveyForm!
            </div>
        );
    }
}

export default reduxForm({
    // key is the option / property of reduxForm that needs to be passed
    form: 'surveyForm'
})(SurveyForm);
