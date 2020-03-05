import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary.js';
import ContactData from './ContactData/ContactData.js';

class Checkout extends Component {


	checkoutContinue = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	checkoutCancel = () => {
		this.props.history.goBack();
	};


	render() {
		let summary = <Redirect to='/' />
		if (this.props.ingred) {
			summary = (
			<div>
				<CheckoutSummary
							checkoutContinue={this.checkoutContinue}
							checkoutCancel={this.checkoutCancel}
							ingredients={this.props.ingred}
					/>
				<Route path={this.props.match.path + '/contact-data'}
						component={ContactData} />
			</div>	)
		}
		return summary;
	}
};

const mapStateToProps = state => {
	return {
		ingred: state.burgerBuilder.ingredients
	}
}

export default connect(mapStateToProps)(Checkout);