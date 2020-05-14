import React, { Component } from 'react';
import axios from '../../../instances/axiosOrders.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from '../../../components/UI/Spinner/Spinner.js';
import Button from '../../../components/UI/Button/Button.js';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input.js';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

	componentDidMount() {
		this.scrollToBottom();
	}

	scrollToBottom() {
		this.el.scrollIntoView({ behavior: 'smooth' });
	}

	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
			},
			email:  {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
			},
			street:  {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Address'
					},
					value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
			},
			postalCode:  {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
					},
					value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
					isNumber: true
				},
				valid: false,
				touched: false,
			},
			
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
					{value: 'fastest', displayValue: 'Fastest'},

					{value: 'Cheapest', displayValue: 'Cheapest'}
					]
				},
				value: 'fastest',
				validation: {},
				valid: true
			},
			},
		formIsValid: false,
	
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

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			totalPrice: (Number.parseFloat(this.props.totalPrice).toFixed(2)),
			orderData: formData,
			userId: this.props.userId
		}
		
		this.props.onPurchaseBurger(order, this.props.token);
		this.props.history.push('/');
	}

	onChangeHandler = (event,inputId) => {
		const updatedOrderForm = {...this.state.orderForm};
		const updatedElement = {...updatedOrderForm[inputId]};
		updatedElement.value = event.target.value;
		updatedElement.touched = true;
		updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
		updatedOrderForm[inputId] = updatedElement;
		
		let formIsValid = true;
		for (let inputId in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputId].valid && formIsValid;
		}
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});


	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = <Spinner />
		if (this.props.loading === false) {
			form = (
				<form ref={el => { this.el = el; }} onSubmit={this.orderHandler}>
					{formElementsArray.map(formElement => (
						<Input 	key={formElement.id}
							 	elementType={formElement.config.elementType} 
							 	elementConfig={formElement.config.elementConfig} 
							 	value={formElement.config.value}
							 	invalid={!formElement.config.valid}
							 	shouldValidate={formElement.config.validation}
							 	touched={formElement.config.touched}
							 	changed={(event) => this.onChangeHandler(event,formElement.id)} />
							 	)
							)
						}
						
					<Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
				</form>
				);
		};

		return (
			<div className={classes.ContactData}
				>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPurchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));