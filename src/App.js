import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.module.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as authActions from './store/actions/index'; 

class App extends Component{

  componentDidMount () {
    this.props.onAutoSignUp();
  }

  render(){

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthed){
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(authActions.authStateCheck())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
