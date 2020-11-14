import * as actionTypes from './actionTypes';
import axios from '../../axiosInterceptor';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth=" + token, orderData)
            .then(res => {
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            }, err => {
                dispatch(purchaseBurgerFail(err));
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (allOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: allOrders
    }
}

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParam)
            .then(res => {
                const gettedOrders = [];
                for(let key in res.data){
                    gettedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(gettedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}