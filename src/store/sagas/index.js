import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, authCheckTimeoutSaga, authSaga, authStateCheckSaga } from './auth';
import { initIngredSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrderSaga } from './order';

export function* watchAuth () {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_INIT_STATE, authStateCheckSaga),
        takeEvery(actionTypes.AUTH_USER, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authCheckTimeoutSaga),
        takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga)
    ])
}

export function* watchBuilder () {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredSaga);
}

export function* watchOrders () {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);

    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrderSaga);
}
