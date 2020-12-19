import { put } from 'redux-saga/effects';

import axios from '../../axiosInterceptor';
import * as actions from '../actions';

export function* purchaseBurgerSaga (act) {
    yield put(actions.purchaseBurgerStart());
    try {
        const res = yield axios.post("/orders.json?auth=" + act.token, act.orderData);
        yield put(actions.purchaseBurgerSuccess(res.data.name, act.orderData));
    } catch (err) {
        yield put(actions.purchaseBurgerFail(err));
    }
}

export function* fetchOrderSaga (act) {
    yield put(actions.fetchOrdersStart());
    const queryParam = '?auth=' + act.token + '&orderBy="userId"&equalTo="' + act.userId + '"';
    try {
        const res = yield axios.get('/orders.json' + queryParam);
        const gettedOrders = [];
        for(let key in res.data){
            gettedOrders.push({
                ...res.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(gettedOrders));
    } catch (err) {
        yield put(actions.fetchOrdersFail());
    }
}