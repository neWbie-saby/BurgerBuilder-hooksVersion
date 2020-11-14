import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimer = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDn3FkwX7ASjtaj4QYAnuElGaJ9t_Z6nwI';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDn3FkwX7ASjtaj4QYAnuElGaJ9t_Z6nwI';
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expireDate', expDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimer(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error.message));
            });
    }
}

export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authStateCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token)
            dispatch(logout());
        else {
            const expDate = new Date(localStorage.getItem('expireDate'));
            if(expDate <= new Date()){
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimer((expDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}