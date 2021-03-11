import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler';
import * as builderActions from '../../store/actions/index';
import axios from '../../axiosInterceptor';

export const BurgerBuilder = props => {
    const [checkOut, setCheckOut] = useState(false);

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });
    const price = useSelector(state => state.burgerBuilder.totalAmt);
    const loadError = useSelector(state => state.burgerBuilder.loadError);
    const isAuthed = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();

    const onIngredAdded = (name) => dispatch(builderActions.addIngredient(name));
    const onIngredRemoved = (name) => dispatch(builderActions.removeIngredient(name));
    const onInitIngredients = useCallback(() => dispatch(builderActions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(builderActions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(builderActions.setRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = ingredients => {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // console.log(sum);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if(isAuthed)
            setCheckOut(true);
        else{
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setCheckOut(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disableInfo = {...ings};
    for(let i in disableInfo)
        disableInfo[i] = disableInfo[i] <= 0;
    
    let orderSummary = null;
    let burger = loadError ? <p>Ingredients are absent</p> : <Spinner />;

    if(ings){
        burger = (
                <Aux>
                    <Burger ingredients={ings}/>
                    <BuildControls
                    disabled={disableInfo}
                    IngreAdded={onIngredAdded}
                    IngreRemoved={onIngredRemoved}
                    amount={price}
                    canBuy={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    authed={isAuthed}/>
                </Aux>);
        orderSummary = (
            <OrderSummary
                amount={price}
                ingredients={ings}
                canceled={purchaseCancelHandler}
                continue={purchaseContinueHandler} />
        );
    }

    return (
        <Aux>
            <Modal show={checkOut} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
    
}

export default errorHandler(BurgerBuilder, axios);