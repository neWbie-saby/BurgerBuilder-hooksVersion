import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './Ingredient/Ingredient';

const burger = props => {
    let ingredientsArr = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            });
        }).reduce((arr, e) => {
            return arr.concat(e);
        }, []);
    // console.log(ingredientsArr);
    if(ingredientsArr.length === 0){
        ingredientsArr = <p>Please add your ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsArr}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;