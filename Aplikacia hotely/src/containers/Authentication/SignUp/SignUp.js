import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import classes from '../Login/Login.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { checkValidity } from '../../../components/UI/Input/checkValidity';


class SignUp extends PureComponent {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Zadaj email'
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
					placeholder: 'Zadaj heslo'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false,
			},
			retypePassword: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Zadaj potvrdenie hesla'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false,
			}
		},
		validity: null
	};

	

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
			}
		};
		this.setState({ controls: updatedControls });
	}

	inputOutFocusHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true,
			}
		};
		this.setState({ controls: updatedControls });
	}

	onSubmitHandler = event => {
		event.preventDefault();
		if (this.state.controls.password.value !== this.state.controls.retypePassword.value) {
			this.setState({ validity: 'Heslá sa nezhodujú, zadajte rovnaké heslo' });
		} else if (this.state.controls.password.value === '' || this.state.controls.retypePassword.value === '' || this.state.controls.email.value === '') {
			this.setState({ validity: 'Vyplnte všetky polia' });
		} else {
			this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value, true, this.state.controls);
			const updatedControls = { ...this.state.controls };
			updatedControls.password.value = '';
			updatedControls.email.value = '';
			updatedControls.retypePassword.value = '';
			this.setState({ controls: updatedControls });
		}
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
				check={(event) => this.inputOutFocusHandler(event, formElement.id)}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		));

		let loading = null;
		if (this.props.loading) {
			loading = <Spinner />
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p style={{ 'color': '#c3272a' }}>{this.props.error.message}</p>
			)
		}

		

		return (

			<div className={classes.Auth}>
				<h2>Registrácia</h2>
				<div className={classes.formDiv}>
					<form className={classes.AuthForm}>
						{form}
						{errorMessage}
						<p className={classes.error}>{this.state.validity}</p>
						<button onClick={event => this.onSubmitHandler(event)}>Registrovať sa <div>{loading}</div></button>
					</form>
					<p>Ste už zaregistrovaný? <strong onClick={() => this.props.changeType()}>Prihlásiť sa</strong></p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.auth.error,
		loading: state.auth.loading,
		isLoggedIn: state.auth.token != null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLogin: (email, password, method) => dispatch(actions.authentication(email, password, method)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);