import * as actionTypes from './actionTypes';

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
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
};