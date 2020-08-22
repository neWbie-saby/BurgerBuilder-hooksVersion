import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        amount: 0
    }

    UNSAFE_componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingreeds = {};
        let amt = 0;
        for(let param of query.entries()){
            if(param[0] === 'amt')
                amt = param[1]
            else
                ingreeds[param[0]] = +param[1];
        }
        this.setState({ingredients: ingreeds, amount: amt});
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/delivery-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                 ingredients={this.state.ingredients}
                 checkoutContinue={this.checkoutContinueHandler}
                 checkoutCancel={this.checkoutCancelHandler}/>
                 <Route
                  path={this.props.match.path + '/delivery-data'}
                  render={(props) => <ContactData ingredients={this.state.ingredients} amount={this.state.amount} {...props}/>} />
            </div>
        );
    }
}

export default Checkout;