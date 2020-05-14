import React from 'react';

import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl.js';

const BurgerControls = props => {

	const capitalize = str => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	const controls = Object.keys(props.ingredients).map((ingred,i) => {
		return <BurgerControl 	more={() => props.more(ingred)} 
								less={() => props.less(ingred)} 
								label={capitalize(ingred)} 
								key={i}
								disabled={props.disabled[ingred]}/>
	});

	return (
		<div className={classes.BurgerControls}>
			<p>Total Price <strong>{props.price.toFixed(2)}</strong> €</p>
			{controls}
			<button
				onClick={() => props.modalShowed()}
				className={classes.OrderButton}
				disabled={!props.purchasable}>{props.isAuth ? "ORDER NOW" : "SIGN UP PLEASE" }</button>
		</div>
		);
} 

export default BurgerControls;