import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary.js';
import Button from '../../UI/Button/Button.js';

class OrderSummary extends Component  {


	render() {

		const ingredientSummary = Object.keys(this.props.ingredients)
			.map(igKey => {
				return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
				</li>
				)
			});

		return (
			<Aux>
				<h3>Your order</h3>
				<p>A delicious burger with the following ingredients</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p>Current Price: <strong>{this.props.price.toFixed(2)}</strong></p>
				<p>Continue to Checkout</p>
				<Button btnType='Danger' clicked={this.props.modalClose}>Cancel</Button>
				<Button btnType='Success' clicked={this.props.modalContinue}>Continue</Button>

			</Aux>
			);
	};
};

export default OrderSummary;