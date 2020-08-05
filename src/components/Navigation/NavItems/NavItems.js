import React from 'react';

import classes from './NavItems.module.css'

let active = true;

const navItems = props => (
    <ul className={classes.NavItems}>
        <li className={classes.EachItem}>
            <a href='/' className={active ? classes.active : null}>
                Burger Builder
            </a>
        </li>
        <li className={classes.EachItem}>
            <a href='/' className={!active ? classes.active : null}>
                Checkout
            </a>
        </li>
    </ul>
);

export default navItems;