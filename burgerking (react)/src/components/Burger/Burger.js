import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients.js';

const Burger = (props) => {

	let transformedIngredients = Object.keys(props.ingredients)
	.map(ingKey => {
		return [...Array(props.ingredients[ingKey])].map((_,i) => {
			return <BurgerIngredient type={ingKey} key={ingKey + i}/>
		});

	}).reduce((arr,el) => {
		return arr.concat(el);
	}, []);
	
	if (transformedIngredients.length === 0) {
		transformedIngredients = 'please start adding... :)';
	}


	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" key="bt" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" key="bb"/>
		</div>
		);

}

export default Burger;