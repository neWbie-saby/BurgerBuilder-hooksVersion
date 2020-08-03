import React from 'react';

import classes from './EachControl.module.css';

const eachControl = props => (
    <div className={classes.EachControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.More} onClick={props.added}>+</button>
        <button
         className={classes.Less}
         onClick={props.removed}
         disabled={props.disabled}>-</button>
    </div>
);

export default eachControl;