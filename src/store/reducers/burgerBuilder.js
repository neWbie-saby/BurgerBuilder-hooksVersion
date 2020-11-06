import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    meat: 80,
    salad: 30,
    cheese: 55,
    bacon: 75.5
}

const initState = {
    ingredients: null,
    totalAmt: 50,
    loadError: false
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredName]: state.ingredients[action.ingredName] + 1
        },
        totalAmt: state.totalAmt + INGREDIENT_PRICES[action.ingredName]
    }
}

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredName]: state.ingredients[action.ingredName] - 1
        },
        totalAmt: state.totalAmt - INGREDIENT_PRICES[action.ingredName]
    }
}

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            meat: action.ingredients.meat,
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon
        },
        loadError: false,
        totalAmt: 50
    }
}

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        loadError: true
    }
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;