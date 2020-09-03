import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosInterceptor';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    state = {
        checkOut: false,
        loadIng: false,
        loadError: false
    }

    componentDidMount () {
        // axios.get("/ingredients.json")
        //     .then(res => {
        //         this.setState({ingredients: res.data});
        //     })
        //     .catch(err => {
        //         this.setState({loadError: true});
        //     })
    }

    updatePurchaseState (ingredients) {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // console.log(sum);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({checkOut: true});
    }

    purchaseCancelHandler = () => {
        this.setState({checkOut: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render(){
        const disableInfo = {...this.props.ings};
        for(let i in disableInfo)
            disableInfo[i] = disableInfo[i] <= 0;
        
        let orderSummary = null;
        let burger = this.state.loadError ? <p>Ingredients are absent</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                    <Aux>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls
                        disabled={disableInfo}
                        IngreAdded={this.props.onIngredAdded}
                        IngreRemoved={this.props.onIngredRemoved}
                        amount={this.props.price}
                        canBuy={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}/>
                    </Aux>);
            orderSummary = (
                <OrderSummary
                 amount={this.props.price}
                 ingredients={this.props.ings}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalAmt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredAdded: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredName: name}),
        onIngredRemoved: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredName: name}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));