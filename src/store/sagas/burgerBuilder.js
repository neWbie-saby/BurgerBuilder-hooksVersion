import { put } from 'redux-saga/effects';

import axios from '../../axiosInterceptor';
import * as actions from '../actions';

export function* initIngredSaga () {
    try {
        const res = yield axios.get("/ingredients.json");
        yield put(actions.setIngredients(res.data));
    } catch (err) {
        yield put(actions.fetchIngredientsFailed());
    }
}