import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../instances/axiosOrders.js';

import Aux from '../../hoc/Auxilliary/Auxilliary.js';
import Burger from '../../components/Burger/Burger.js';
import BurgerControls from '../../components/BurgerControls/BurgerControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import * as burgerBuilderActions from '../../store/actions/index.js';

class BurgerBuilder extends Component {


	state = {
		purchasable: false,
		shownModal: false,
	};

	componentDidMount() {
		this.props.onIngredientFetching();
		this.props.onLoad();
	}

	showModal = () => {
		this.setState({shownModal: true});
	};

	closeModal = () => {
		this.setState({shownModal: false});
	};

	continueModal = () => {
		this.props.history.push('/checkout');
	};
	

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
		.map(igKey => {
			return ingredients[igKey];
		}).reduce((sum, el) => {
			return sum + el;
		}, 0);
		return sum > 0;
	};

	render() {

		const disabledInfo = {...this.props.ingred};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		};

		let orderSummary = null;
		let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;	
		if (this.props.ingred) {
			burger = ( <Aux>
							<Burger ingredients={this.props.ingred}/>
							<BurgerControls more={this.props.onIngredientAdd}
									modalShowed={this.showModal}
									price={this.props.totalPrice}
						 			less={this.props.onIngredientRemove}
								    ingredients={this.props.ingred}
								    disabled={disabledInfo}
								    purchasable={this.updatePurchaseState(this.props.ingred)} />
					 </Aux>
				);
			orderSummary = <OrderSummary price={this.props.totalPrice} ingredients={this.props.ingred} modalClose={this.closeModal} modalContinue={this.continueModal}/>;
		}


		return (
			<Aux>
			
				<Modal modalClose={this.closeModal} show={this.state.shownModal}>
					{orderSummary}
				</Modal>
				{burger}

				
			</Aux>
		);
	};
};

const mapStateToProps = (state) => {
	return {
		ingred: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdd: (ingredName) => dispatch(burgerBuilderActions.addIngred(ingredName)),
		onIngredientRemove: (ingredName) => dispatch(burgerBuilderActions.deleteIngred(ingredName)),
		onIngredientFetching: () => dispatch(burgerBuilderActions.initIngred()),
		onLoad: () => dispatch(burgerBuilderActions.purchasePriceUpdate())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));