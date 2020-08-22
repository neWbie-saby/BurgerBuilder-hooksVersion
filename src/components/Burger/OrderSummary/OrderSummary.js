import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate(){
        console.log("[OrderSummary.js] rendering")
    }

    render(){
        const summary = Object.keys(this.props.ingredients)
            .map(key => (
                <li
                style={{
                    display: 'block',
                    width: '88%'
                }}
                key={key}>
                    {this.props.ingredients[key]} <span style={{textTransform: 'capitalize'}}>{key}</span>
                </li>
            ));
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Your scrumptious burger has :</p>
                <ul>
                    {summary}
                </ul>
                <p><strong>Total Amount : Rs. {this.props.amount.toFixed(2)}</strong></p>
                <p>Checkout?</p>
                <Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
                <Button btnType="Danger" clicked={this.props.canceled}>CANCEL</Button>
            </Aux>
        );
    }
}

export default OrderSummary;