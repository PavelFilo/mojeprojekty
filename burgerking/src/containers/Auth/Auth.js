import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: true,
	}

	checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.isNumber) {
			isValid = isNaN(Number(value)) !== true && isValid;
		}

		if (rules.required) {
			isValid = value.replace(' ', '') !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}


		return isValid;

	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true,
			}
		};
		this.setState({ controls: updatedControls });
	}

	onSubmitHandler = event => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

	}

	switchSignButton = () => {
		this.setState({ isSignup: !this.state.isSignup });
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementsArray.map(formElement => (
			<Input 
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		));
		if (this.props.loading) { form = <Spinner />}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = (
				<p>There is an error going on</p>	
			)
		}

		return (

			<div className={classes.Auth}>
				<form onSubmit={(event) => this.onSubmitHandler(event)}>
					{form}
					{errorMessage}
					<Button btnType="Success">Log In</Button>
				</form>
				<Button
					btnType="Danger"
					clicked={this.switchSignButton}>Switch to {this.state.isSignup ? "Sign In" : "Sign Up"} </Button>
            </div>
            
            );
    }
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, method) => dispatch(actions.authentication(email,password, method)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);