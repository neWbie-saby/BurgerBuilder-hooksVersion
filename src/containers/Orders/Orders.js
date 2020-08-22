import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axiosInterceptor';
import errorHandler from '../../hoc/ErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        getting: true
    }
    
    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                // console.log(res.data);
                const gettedOrders = [];
                for(let key in res.data){
                    gettedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({getting: false, orders: gettedOrders});
            })
            .catch(err => {
                this.setState({getting: false});
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                     key={order.id}
                     ingredients={order.ingredients}
                     amount={+order.totalAmt}/>
                ))}
            </div>
        );
    }
}

export default errorHandler(Orders, axios);