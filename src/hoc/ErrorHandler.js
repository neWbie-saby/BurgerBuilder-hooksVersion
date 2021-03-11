import React from 'react';

import Modal from '../components/UI/Modal/Modal';
import Aux from '../hoc/Aux';
import useHttpErrorHandler from '../hooks/http-errorHandler';

const errorHandler = (WrappedCompo, axios) => {
    return props => {
        const [error, errorConfirmHandler] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Modal 
                    show={error}
                    modalClosed={errorConfirmHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedCompo {...props} />
            </Aux>
        );
    }
}

export default errorHandler;