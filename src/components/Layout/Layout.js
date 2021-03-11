import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [sideDrawer, showSideDrawer] = useState(false);
    
    const sideDrawerCloseHandler = () => {
        showSideDrawer(false);
    }

    const sideDrawerOpenHandler = () => {
        showSideDrawer(!sideDrawer);
    }

    return (
        <Aux>
            <Toolbar
                isAuth={props.authed} 
                clicked={sideDrawerOpenHandler}/>
            <SideDrawer
                isAuth={props.authed}
                open={sideDrawer}
                closed={sideDrawerCloseHandler}/>
            {/* <div>Toolbar, Sidebar, Backdrop</div> */}
            <main className={classes.Seperated}>
                {props.children}
            </main>
        </Aux>
    );
    
}

const mapStateToProps = state => {
    return {
        authed: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);