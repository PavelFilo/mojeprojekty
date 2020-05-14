import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


import * as actions from '../../../store/actions/index';
import classes from './Login.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Login extends PureComponent {
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
			}
		},
		validity: null,
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.isEmail) {
			isValid = value.match(/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i) && isValid;
		}

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
		if (this.state.controls.password.value === '' || this.state.controls.email.value === '') {
			this.setState({ validity: 'Vyplnte všetky polia' });
		} else {
			this.setState({ validity: null });
			this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value, false);
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
			<input
				type={formElement.config.elementConfig.type}
				key={formElement.id}
				value={formElement.config.value}
				placeholder={formElement.config.elementConfig.placeholder}
				onChange={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		)); 

		let loading = null;
		if (this.props.loading) {
			loading = <Spinner />
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p style={{ 'color': '#c3272a' }}>Prihlásenie zlyhalo, zadajte správny email a heslo </p>
			)
		}

		

		return (

            <div className={classes.Auth}>
				<h2>Prihlásenie</h2>
				<form className={classes.AuthForm}>
					{form}
					{errorMessage}
					<p className={classes.error}>{this.state.validity}</p>
					<button onClick={event => this.onSubmitHandler(event)}>Prihlásiť sa <div>{loading}</div></button>
                </form>
                <p>Nie ste zaregistrovaný? <strong onClick={() => this.props.changeType()}>Zaregistrovať sa</strong></p>
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

export default connect( mapStateToProps , mapDispatchToProps)(Login);