import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    meat: 80,
    salad: 30,
    cheese: 55,
    bacon: 75.5
}

const initState = {
    ingredients: {
        meat: 0,
        salad: 0,
        bacon: 0,
        cheese: 0
    },
    totalAmt: 50
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredName]: state.ingredients[action.ingredName] + 1
                },
                totalAmt: state.totalAmt + INGREDIENT_PRICES[action.ingredName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredName]: state.ingredients[action.ingredName] - 1
                },
                totalAmt: state.totalAmt - INGREDIENT_PRICES[action.ingredName]
            }
        default:
            return state;
    }
}

export default reducer;