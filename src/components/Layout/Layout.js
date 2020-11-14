import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar
                 isAuth={this.props.authed} 
                 clicked={this.sideDrawerOpenHandler}/>
                <SideDrawer
                 isAuth={this.props.authed}
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

const mapStateToProps = state => {
    return {
        authed: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);