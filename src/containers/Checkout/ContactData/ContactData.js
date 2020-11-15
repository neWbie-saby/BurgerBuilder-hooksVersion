import React, { Component } from 'react';
import { connect} from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axiosInterceptor';
import Input from '../../../components/UI/Input/Input';
import errorHandler from '../../../hoc/ErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { checkIfValid } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                editted: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                editted: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                editted: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                editted: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail ID'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                editted: false
            },
            paymentMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'COD', displayValue: 'Cash On Delivery'},
                        {value: 'IB', displayValue: 'Online Payment'},
                    ]
                },
                value: 'COD',
                valid: true
            }
        },
        formCanSubmit: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loadIng: true});
        const customerDets = {};
        for(let id in this.state.orderForm){
            customerDets[id] = this.state.orderForm[id].value;
        }
        const order = {
            ingredients: this.props.ings,
            totalAmt: this.props.price,
            customer: customerDets,
            userId: this.props.userId
        };
        this.props.onBurgerOrder(order, this.props.token);
    }

    formInputChangeHandler = (event, inputType) => {
        const newOrderForm = {
            ...this.state.orderForm
        };
        const formEleData = {
            ...newOrderForm[inputType]
        };
        formEleData.value = event.target.value;
        if(formEleData.validation)
            formEleData.valid = checkIfValid(formEleData.value, formEleData.validation);
        formEleData.editted = true;
        newOrderForm[inputType] = formEleData;

        let formIsValid = true;
        for(let inputers in newOrderForm)
            formIsValid = newOrderForm[inputers].valid && formIsValid;

        this.setState({ orderForm: newOrderForm, formCanSubmit: formIsValid });
    }

    render () {
        const formElementsArr = [];
        for(let key in this.state.orderForm){
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArr.map(formEle => (
                    <Input
                     key={formEle.id}
                     elementType={formEle.config.elementType}
                     elementConfig={formEle.config.elementConfig}
                     value={formEle.config.value}
                     invalid={!formEle.config.valid}
                     shouldCheck={formEle.config.validation}
                     editted={formEle.config.editted}
                     entered={(event) => this.formInputChangeHandler(event, formEle.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formCanSubmit} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.props.loading)
            form = <Spinner />
        return (
            <div className={classes.ContactData}>
                <h4>Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalAmt,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios));