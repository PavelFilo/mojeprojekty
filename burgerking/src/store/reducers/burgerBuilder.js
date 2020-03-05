import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	error: false,
	totalPrice: 2
}

const INGREDIENTS_PRICES = {
	salad: 0.4,
	cheese: 0.8,
	bacon: 1,
	meat: 1.5
}

const addIngred = (state, action) => {
	const updatedIngred = { [action.ingredName]: state.ingredients[action.ingredName] + 1 }
	const updatedIngredients = updateObject(state.ingredients, updatedIngred);
	const updatedState = {
		...state,
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredName]
	}
	return updateObject(state, updatedState);
};

const removeIngred = (state, action) => {
	const updatedIng = { [action.ingredName]: state.ingredients[action.ingredName] - 1 }
	const updatedIngr = updateObject(state.ingredients, updatedIng);
	const updatedSt = {
		...state,
		ingredients: updatedIngr,
		totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredName]
	}
	return updateObject(state, updatedSt);
}

const settIngred = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		error: false,
	});
}

const failIngred = (state) => {
	return updateObject(state, {
		error: true,
	});
}

const priceUpdate = (state) => {
	return updateObject(state, {
		totalPrice: 2
	});
}

const reducer = (state = initialState, action) => {
	
		switch (action.type) {
			case actionTypes.ADD_INGRED: return addIngred(state, action);
			case actionTypes.REMOVE_INGRED: return removeIngred(state, action);
			case actionTypes.SET_INGRED: return settIngred(state, action);
			case actionTypes.INGRED_FAILED: return failIngred(state);
			case actionTypes.BURGER_PRICE_UPDATE: return priceUpdate(state);		
			default: return state;
		}
}

export default reducer;