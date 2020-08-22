import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosInterceptor';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler';

const INGREDIENT_PRICES = {
    meat: 80,
    salad: 30,
    cheese: 55,
    bacon: 75.5
}

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalAmt: 50,
        canPurchase: false,
        checkOut: false,
        loadIng: false,
        loadError: false
    }

    componentDidMount () {
        axios.get("/ingredients.json")
            .then(res => {
                this.setState({ingredients: res.data});
            })
            .catch(err => {
                this.setState({loadError: true});
            })
    }

    addIngredientHandler = type => {
        const newCount = this.state.ingredients[type] + 1;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount;
        const newAmt = this.state.totalAmt + INGREDIENT_PRICES[type];

        this.setState({totalAmt: newAmt, ingredients: newIngredients});
        this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = type => {
        if(this.state.ingredients[type] > 0){
            const newCount = this.state.ingredients[type] - 1;
            const newIngredients = {...this.state.ingredients};
            newIngredients[type] = newCount;
            const newAmt = this.state.totalAmt - INGREDIENT_PRICES[type];

            this.setState({totalAmt: newAmt, ingredients: newIngredients});
            this.updatePurchaseState(newIngredients);
        }
    }

    updatePurchaseState (ingredients) {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // console.log(sum);
        this.setState({canPurchase: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({checkOut: true});
    }

    purchaseCancelHandler = () => {
        this.setState({checkOut: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('amt=' + this.state.totalAmt);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disableInfo = {...this.state.ingredients};
        for(let i in disableInfo)
            disableInfo[i] = disableInfo[i] <= 0;
        
        let orderSummary = null;
        let burger = this.state.loadError ? <p>Ingredients are absent</p> : <Spinner />;

        if(this.state.ingredients){
            burger = (
                    <Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls
                        disabled={disableInfo}
                        IngreAdded={this.addIngredientHandler}
                        IngreRemoved={this.removeIngredientHandler}
                        amount={this.state.totalAmt}
                        canBuy={this.state.canPurchase}
                        ordered={this.purchaseHandler}/>
                    </Aux>);
            orderSummary = (
                <OrderSummary
                 amount={this.state.totalAmt}
                 ingredients={this.state.ingredients}
                 canceled={this.purchaseCancelHandler}
                 continue={this.purchaseContinueHandler} />
            );
        }

        if(this.state.loadIng)
            orderSummary = <Spinner />;

        return (
            <Aux>
                <Modal show={this.state.checkOut} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder, axios);