import React, { useState } from 'react';
import { connect} from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axiosInterceptor';
import Input from '../../../components/UI/Input/Input';
import errorHandler from '../../../hoc/ErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { checkIfValid } from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
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
    });
    const [formCanSubmit, setFormCanSubmit] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loadIng: true});
        const customerDets = {};
        for(let id in orderForm){
            customerDets[id] = orderForm[id].value;
        }
        const order = {
            ingredients: props.ings,
            totalAmt: props.price,
            customer: customerDets,
            userId: props.userId
        };
        props.onBurgerOrder(order, props.token);
    }

    const formInputChangeHandler = (event, inputType) => {
        const newOrderForm = {
            ...orderForm
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

        setOrderForm(newOrderForm);
        setFormCanSubmit(formIsValid);
    }

    const formElementsArr = [];
    for(let key in orderForm){
        formElementsArr.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArr.map(formEle => (
                <Input
                    key={formEle.id}
                    elementType={formEle.config.elementType}
                    elementConfig={formEle.config.elementConfig}
                    value={formEle.config.value}
                    invalid={!formEle.config.valid}
                    shouldCheck={formEle.config.validation}
                    editted={formEle.config.editted}
                    entered={(event) => formInputChangeHandler(event, formEle.id)} />
            ))}
            <Button btnType='Success' disabled={!formCanSubmit} clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if(props.loading)
        form = <Spinner />

    return (
        <div className={classes.ContactData}>
            <h4>Contact Data</h4>
            {form}
        </div>
    );
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