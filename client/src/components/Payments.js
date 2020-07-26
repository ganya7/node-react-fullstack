import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import StripeCheckout from "react-stripe-checkout";

class Payments extends Component {
    render() {
        // debugger;
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add credits</button>
            </StripeCheckout>
            // 500 cents
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

// key can be our own choice, but values has to be the action name associated with it that was exported
export default connect(null, actions)(Payments);