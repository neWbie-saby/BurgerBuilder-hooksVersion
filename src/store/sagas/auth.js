import { delay, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';
import { key } from '../../secure/apiKey';

export function* logoutSaga (action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expireDate');
    yield call([localStorage, 'removeItem'], 'userId');

    yield put(actions.logoutSuccess());
}

export function* authCheckTimeoutSaga (action) {
    yield delay(action.expTime * 1000);
    yield put(actions.logout());
}

export function* authSaga (act) {
    yield put(actions.authStart());
    const authData = {
        email: act.email,
        password: act.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key;
    if(!act.isSignUp){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + key;
    }
    try {
        const res = yield axios.post(url, authData)

        const expDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expireDate', expDate);
        yield localStorage.setItem('userId', res.data.localId);

        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimer(res.data.expiresIn));
    } catch (err) {
        yield put(actions.authFail(err.response.data.error.message));
    }
}

export function* authStateCheckSaga (act) {
    const token = yield localStorage.getItem('token');
        if(!token)
            yield put(actions.logout());
        else {
            const expDate = yield new Date(localStorage.getItem('expireDate'));
            if(expDate <= new Date()){
                yield put(actions.logout());
            }
            else {
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token, userId));
                yield put(actions.checkAuthTimer((expDate.getTime() - new Date().getTime()) / 1000));
            }
        }
}