import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
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
                 ingredients={this.props.ings}
                 checkoutContinue={this.checkoutContinueHandler}
                 checkoutCancel={this.checkoutCancelHandler}/>
                 <Route
                  path={this.props.match.path + '/delivery-data'}
                  component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalAmt
    }
}

export default connect(mapStateToProps)(Checkout);