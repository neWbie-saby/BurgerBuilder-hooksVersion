import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler';
import * as builderActions from '../../store/actions/index';
import axios from '../../axiosInterceptor';

class BurgerBuilder extends Component{
    state = {
        checkOut: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
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
        if(this.props.isAuthed)
            this.setState({checkOut: true});
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({checkOut: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disableInfo = {...this.props.ings};
        for(let i in disableInfo)
            disableInfo[i] = disableInfo[i] <= 0;
        
        let orderSummary = null;
        let burger = this.props.loadError ? <p>Ingredients are absent</p> : <Spinner />;

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
                        ordered={this.purchaseHandler}
                        authed={this.props.isAuthed}/>
                    </Aux>);
            orderSummary = (
                <OrderSummary
                 amount={this.props.price}
                 ingredients={this.props.ings}
                 canceled={this.purchaseCancelHandler}
                 continue={this.purchaseContinueHandler} />
            );
        }

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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalAmt,
        loadError: state.burgerBuilder.loadError,
        isAuthed: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredAdded: (name) => dispatch(builderActions.addIngredient(name)),
        onIngredRemoved: (name) => dispatch(builderActions.removeIngredient(name)),
        onInitIngredients: () => dispatch(builderActions.initIngredients()),
        onInitPurchase: () => dispatch(builderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(builderActions.setRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));