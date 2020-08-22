import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItems.module.css'

const navItems = props => (
    <ul className={classes.NavItems}>
        <li className={classes.EachItem}>
            <NavLink
             to='/'
             exact
             activeClassName={classes.active}>
                Burger Builder
            </NavLink>
        </li>
        <li className={classes.EachItem}>
            <NavLink
             to='/orders'
             activeClassName={classes.active}>
                Orders
            </NavLink>
        </li>
    </ul>
);

export default navItems;