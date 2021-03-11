import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.module.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as authActions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
  const { onAutoSignUp } = props;

  useEffect(() => {
    onAutoSignUp();
  }, [onAutoSignUp]);

  let routes = (
    <Switch>
      <Route path='/auth' render={props => <Auth {...props}/>} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if(props.isAuthed){
    routes = (
      <Switch>
        <Route path='/checkout' render={props => <Checkout {...props}/>} />
        <Route path='/orders' render={props => <Orders {...props}/>} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to={props.redirectPath} />
      </Switch>
    );
  }

  return (
    <div className={classes.App}>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
  
}

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.token !== null,
    redirectPath: state.auth.redirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(authActions.authStateCheck())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
