import React from 'react';

import classes from './BuildControls.module.css';
import EachControl from './EachControl/EachControl';

const controls = [
    { label: 'Meat', type: 'meat'},
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'},
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Amount Payable: <strong>Rs. {props.amount.toFixed(2)}</strong></p>
        {controls.map(each => (
            <EachControl
             added={() => props.IngreAdded(each.type)}
             removed={() => props.IngreRemoved(each.type)}
             disabled={props.disabled[each.type]}
             key={each.label}
             label={each.label} />
        ))}
    </div>
);

export default buildControls;

