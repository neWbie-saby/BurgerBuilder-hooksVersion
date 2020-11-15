import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkIfValid } from '../../shared/utility';

class Auth extends Component {
    state = {
        authForm: {
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
        },
        signUp: true
    }

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/')
            this.props.onSetAuthRedirectPath();
    }

    formInputChangeHandler = (event, inputType) => {
        const updatedAuths = {
            ...this.state.authForm,
            [inputType]: {
                ...this.state.authForm[inputType],
                value: event.target.value,
                valid: checkIfValid(event.target.value, this.state.authForm[inputType].validation),
                editted: true
            }
        };
        this.setState({ authForm: updatedAuths });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.signUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { signUp: !prevState.signUp };
        })
    }

    render () {
        const formElementsArr = [];
        for(let key in this.state.authForm){
            formElementsArr.push({
                id: key,
                config: this.state.authForm[key]
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
                entered={(event) => this.formInputChangeHandler(event, formEle.id)} />
        ));

        if(this.props.loading)
            form = <Spinner />

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthed)
            authRedirect = <Redirect to={this.props.authRedirectPath} />;

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <h1>Authentication</h1>
                <h5>(Don't ask for the definition)</h5>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Enter</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>Switch to {this.state.signUp ? 'Log In' : 'Sign Up'}</Button>
            </div>
        );
    }
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