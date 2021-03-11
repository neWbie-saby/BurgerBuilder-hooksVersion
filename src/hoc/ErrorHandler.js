import React, { useState, useEffect } from 'react';

import Modal from '../components/UI/Modal/Modal';
import Aux from '../hoc/Aux';

const errorHandler = (WrappedCompo, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        }, err => {
            setError(err);
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [resInterceptor, reqInterceptor]);

        return (
            <Aux>
                <Modal 
                    show={error}
                    modalClosed={() => setError(null)}>
                    {error ? error.message : null}
                </Modal>
                <WrappedCompo {...props} />
            </Aux>
        );
    }
}

export default errorHandler;