import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axiosInterceptor';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loadIng: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loadIng: true});
        const order = {
            ingredients: this.props.ingredients,
            totalAmt: this.props.amount,
            customer: {
                name: 'Ursula',
                address: {
                    street: 'Rue Pasteur',
                    zipcode: '65410',
                    country: 'France'
                },
                email: "anything@gmail.com",
            },
            paymentMethod: 'Cash On Delivery'
        };
        axios.post("/orders.json", order)
            .then(res => {
                // console.log(res);
                this.setState({ loadIng: false });
                this.props.history.push('/');
            }, err => {
                console.log(err);
                this.setState({ loadIng: false });
            });
    }

    render () {
        let form = (
            <form>
                <input className={classes.Inputs} type='text' name='name' placeholder='Name' />
                <input className={classes.Inputs} type='email' name='email' placeholder='Email-ID' />
                <input className={classes.Inputs} type='text' name='street' placeholder='Street' />
                <input className={classes.Inputs} type='number' name='postalCode' placeholder='Postal Code' />
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