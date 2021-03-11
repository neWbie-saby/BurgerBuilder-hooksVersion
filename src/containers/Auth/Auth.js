import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkIfValid } from '../../shared/utility';

const Auth = props => {
    const [authForm, setAuthForm] = useState({
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
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Enter a password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 7
            },
            valid: false,
            editted: false
        }
    });
    const [signUp, setSignUp] = useState(true);
    
    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/')
            onSetAuthRedirectPath();
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const formInputChangeHandler = (event, inputType) => {
        const updatedAuths = {
            ...authForm,
            [inputType]: {
                ...authForm[inputType],
                value: event.target.value,
                valid: checkIfValid(event.target.value, authForm[inputType].validation),
                editted: true
            }
        };
        setAuthForm(updatedAuths);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, signUp);
    }

    const switchAuthModeHandler = () => {
        setSignUp(!signUp);
    }

    const formElementsArr = [];
    for(let key in authForm){
        formElementsArr.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArr.map(formEle => (
        <Input 
            key={formEle.id}
            elementType={formEle.config.elementType}
            elementConfig={formEle.config.elementConfig}
            value={formEle.config.value}
            invalid={!formEle.config.valid}
            shouldCheck={formEle.config.validation}
            editted={formEle.config.editted}
            entered={(event) => formInputChangeHandler(event, formEle.id)} />
    ));

    if(props.loading)
        form = <Spinner />

    let errorMessage = null;
    if(props.error) {
        errorMessage = (
            <p>{props.error}</p>
        );
    }

    let authRedirect = null;
    if(props.isAuthed)
        authRedirect = <Redirect to={props.authRedirectPath} />;

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <h1>Authentication</h1>
            <h5>(Don't ask for the definition)</h5>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>Enter</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType='Danger'>Switch to {signUp ? 'Log In' : 'Sign Up'}</Button>
        </div>
    );
    
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthed: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.makingOne,
        authRedirectPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, authMode) => dispatch(actions.auth(email, pass, authMode)),
        onSetAuthRedirectPath: () => dispatch(actions.setRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);