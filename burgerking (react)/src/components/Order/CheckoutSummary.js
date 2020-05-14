import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../Burger/Burger.js';
import Button from '../UI/Button/Button.js';

const CheckoutSummary = props => {
	return(
		<div className={classes.CheckoutSummary}>
			<h1>We hope it will taste well!</h1>
			<Burger ingredients={props.ingredients}/>
			<Button btnType='Danger'
					clicked={props.checkoutCancel}>Cancel</Button>
			<Button btnType='Success'
					clicked={props.checkoutContinue}>Continue</Button>
		</div>
	)
};

export default CheckoutSummary;