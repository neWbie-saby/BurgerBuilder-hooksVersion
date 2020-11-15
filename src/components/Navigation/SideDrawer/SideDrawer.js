import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = props => {
    let addedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        addedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={addedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuthed={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;