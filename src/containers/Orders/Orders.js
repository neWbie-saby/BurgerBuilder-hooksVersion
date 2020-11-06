import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axiosInterceptor';
import errorHandler from '../../hoc/ErrorHandler';
import * as OrderActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    
    componentDidMount () {
        this.props.onFetchOrders();
    }

    render () {
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order
                 key={order.id}
                 ingredients={order.ingredients}
                 amount={+order.totalAmt}/>
            ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(OrderActions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));