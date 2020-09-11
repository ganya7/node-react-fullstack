// shows SurveyForm and SurveyFormReview

import React from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

class SurveyNew extends React.Component {

    /* constructor(props) {
        super(props);
        this.state = { new: true };
    } */
    // the above is equivalent to the following:
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={()=>this.setState({showFormReview: false})} />;
        }
        return (
            <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}


// this is the trick to clear out the form values when going out of SurveyNew
export default reduxForm({
    form: 'surveyForm',
})(SurveyNew);
