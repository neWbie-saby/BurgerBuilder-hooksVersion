import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItems.module.css';

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
        {props.isAuthed
            ? (<li className={classes.EachItem}>
                <NavLink
                to='/orders'
                activeClassName={classes.active}>
                    Orders
                </NavLink>
            </li>) : null
        }
        {!props.isAuthed
            ? (<li className={classes.EachItem}>
                <NavLink
                to='/auth'
                activeClassName={classes.active}>
                    Authenticate
                </NavLink>
            </li>)
            : (<li className={classes.EachItem}>
                <NavLink
                to='/logout'
                activeClassName={classes.active}>
                    Logout
                </NavLink>
            </li>)
        }
    </ul>
);

export default navItems;