import React from 'react';

import classes from './Order.module.css';

const order = props => {
    const ingredients = [];
    for(let ingreedName in props.ingredients){
        ingredients.push(
            {
                name: ingreedName,
                no: props.ingredients[ingreedName]
            }
        );
    }

    const IngredientList = ingredients.map(ig => {
        return <span
         className={classes.Item}
         key={ig.name}>
            {ig.name} {ig.no}
        </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {IngredientList}</p>
            <p>Price: <strong>Rs. {props.amount.toFixed(2)}</strong></p>
        </div>
    );
    
};

export default order;