import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    meat: 80,
    salad: 30,
    cheese: 55,
    bacon: 75.5
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            cheese: 0,
            salad: 0,
            bacon: 0,
            meat: 0
        },
        totalAmt: 50
    }

    addIngredientHandler = type => {
        const newCount = this.state.ingredients[type] + 1;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount;
        const newAmt = this.state.totalAmt + INGREDIENT_PRICES[type];

        this.setState({totalAmt: newAmt, ingredients: newIngredients});
    }

    removeIngredientHandler = type => {
        if(this.state.ingredients[type] > 0){
            const newCount = this.state.ingredients[type] - 1;
            const newIngredients = {...this.state.ingredients};
            newIngredients[type] = newCount;
            const newAmt = this.state.totalAmt - INGREDIENT_PRICES[type];

            this.setState({totalAmt: newAmt, ingredients: newIngredients});
        }
    }

    render(){
        const disableInfo = {...this.state.ingredients};
        for(let i in disableInfo)
            disableInfo[i] = disableInfo[i] <= 0;
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                 disabled={disableInfo}
                 IngreAdded={this.addIngredientHandler}
                 IngreRemoved={this.removeIngredientHandler}
                 amount={this.state.totalAmt}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;