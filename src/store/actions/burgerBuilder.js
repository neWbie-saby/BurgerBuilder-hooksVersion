import * as actionTypes from './actionTypes';
import axios from '../../axiosInterceptor';

export const addIngredient = (name) => {
    return {
        ingredName: name,
        type: actionTypes.ADD_INGREDIENT
    }
};

export const removeIngredient = (name) => {
    return {
        ingredName: name,
        type: actionTypes.REMOVE_INGREDIENT
    }
};

export const setIngredients = (ingreds) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingreds
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("/ingredients.json")
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            })
    }
};