import React, { Component } from 'react';

import classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showDrawer: false
    }
    
    sideDrawerCloseHandler = () => {
        this.setState({showDrawer: false});
    }

    sideDrawerOpenHandler = () => {
        this.setState({showDrawer: true});
    }

    render(){
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerOpenHandler}/>
                <SideDrawer
                 open={this.state.showDrawer}
                 closed={this.sideDrawerCloseHandler}/>
                {/* <div>Toolbar, Sidebar, Backdrop</div> */}
                <main className={classes.Seperated}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;