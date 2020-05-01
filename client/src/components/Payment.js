import React from "react"
import StripeCheckout from "react-stripe-checkout"
import {connect} from "react-redux"
import * as actions from "../actions/index"

class Payments extends React.Component{
    render (){
        return (
            <StripeCheckout 
                amount={500}     //currency default US cents
                token={token=> this.props.handleToken(token)}    //is callback! (poorly named)
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                name="Emaily"
                description="$5 for 5 email credits"
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null,actions)(Payments)