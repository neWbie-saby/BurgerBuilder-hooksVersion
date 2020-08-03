import React from 'react';
import PropTypes from 'prop-types';

import classes from './Ingredient.module.css';

const Ingredient = props => {
    let ingre = null;
    
    switch(props.type){
        case ('bread-bottom'):
            ingre = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingre = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingre = <div className={classes.Meat}></div>;
            break;
        case ('cheese'):
            ingre = <div className={classes.Cheese}></div>;
            break;
        case ('salad'):
            ingre = <div className={classes.Salad}></div>;
            break;
        case ('bacon'):
            ingre = <div className={classes.Bacon}></div>;
            break;
        default:
            ingre = null;
    }

    return ingre;
};

Ingredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default Ingredient;