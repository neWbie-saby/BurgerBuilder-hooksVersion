import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const summary = Object.keys(props.ingredients)
        .map(key => (
            <li
             style={{
                display: 'block',
                width: '88%'
            }}
             key={key}>
                {props.ingredients[key]} <span style={{textTransform: 'capitalize'}}>{key}</span>
            </li>
        ))
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your scrumptious burger has :</p>
            <ul>
                {summary}
            </ul>
            <p>Checkout?</p>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
            <Button btnType="Danger" clicked={props.canceled}>CANCEL</Button>
        </Aux>
    );
};

export default orderSummary;