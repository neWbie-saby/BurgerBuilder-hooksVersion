import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <div
         onClick={props.clicked}
         className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DeskView}>
            <NavItems />
        </nav>
    </header>
);

export default toolbar;