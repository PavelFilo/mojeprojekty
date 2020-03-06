import React, {Component} from 'react';
import axios from '../../instances/axiosOrders.js';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import * as actions from '../../store/actions/index';
import classes from '../../components/Order/Order.css';


class Orders extends Component {
	
	 componentDidMount() {
		 this.props.onFetchOrders(this.props.token);
	 }

	 render() {

		 let orders = <Spinner />
		 if (!this.props.loading) {
			 console.log(this.props.orders)
			 orders = this.props.orders.map(order => (
				 <Order
					 key={order.id}
					 ingredients={order.ingredients}
					 price={order.totalPrice} />
			 ))
		 }



	 	return (
			  <div>
	 			{orders}
	 		</div>
	 	);
	 }
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));