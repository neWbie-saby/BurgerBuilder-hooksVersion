import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axiosInterceptor';
import errorHandler from '../../hoc/ErrorHandler';
import * as OrderActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
    
    const { onFetchOrders } = props;

    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders]);

    let orders = <Spinner />;
    if(!props.loading){
        orders = props.orders.map(order => (
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

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(OrderActions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));