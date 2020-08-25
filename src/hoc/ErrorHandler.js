import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';
import Aux from '../hoc/Aux';

const errorHandler = (WrappedCompo, axios) => {
    return class extends Component {
        state = {
            error: null
        };


        UNSAFE_componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // console.log(req);
                this.setState({error: null});
                // this.state = {
                //     error: null
                // };
                return req;
            }, err => {
                this.setState({error: err});
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                // console.log(err.message);
                this.setState({error: err});
                // this.state = {
                //     error: err
                // };
            });
            // console.log(this.state.error);
        }

        componentDidMount () {
            // (this.state.error) ? console.log(this.state.error.message) : console.log('NULL');
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render () {
            return (
                <Aux>
                    <Modal 
                     show={this.state.error}
                     modalClosed={() => this.setState({error: null})}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedCompo {...this.props} />
                </Aux>
            );
        } 
    }
}

export default errorHandler;