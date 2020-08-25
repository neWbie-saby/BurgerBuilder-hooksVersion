import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axiosInterceptor';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail ID'
                },
                value: ''
            },
            paymentMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'COD', displayValue: 'Cash On Delivery'},
                        {value: 'IB', displayValue: 'Online Payment'},
                    ]
                },
                value: 'COD'
            }
        },
        loadIng: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loadIng: true});
        const customerDets = {};
        for(let id in this.state.orderForm){
            customerDets[id] = this.state.orderForm[id].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            totalAmt: this.props.amount,
            customer: customerDets
        };
        axios.post("/orders.json", order)
            .then(res => {
                // console.log(res);
                this.setState({ loadIng: false });
                this.props.history.push('/');
            }, err => {
                // console.log(err);
                this.setState({ loadIng: false });
            });
    }

    formInputChangeHandler = (event, inputType) => {
        const newOrderForm = {
            ...this.state.orderForm
        };
        const formData = {
            ...newOrderForm[inputType]
        };
        formData.value = event.target.value;
        newOrderForm[inputType] = formData;
        this.setState({ orderForm: newOrderForm})
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
                     entered={(event) => this.formInputChangeHandler(event, formEle.id)} />
                ))}
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loadIng)
            form = <Spinner />
        return (
            <div className={classes.ContactData}>
                <h4>Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;