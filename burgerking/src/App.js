import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect, } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';
import Logout from './containers/Auth/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders.js');
})

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
})

class App extends Component {
	componentDidMount() {
		this.props.onReloadAuth();
	}
	render() {

		let routes = (
			<Switch>
				<Route path='/auth' exact component={asyncAuth} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
			);

		if (this.props.isLoggedIn) {
			routes = (
				<Switch>
					<Route path='/orders' component={asyncOrders} />
					<Route path='/checkout' component={asyncCheckout} />
					<Route path='/logout' exact component={Logout} />
					<Route path='/' exact component={BurgerBuilder} />	
					{this.props.building ? <Redirect to="/checkout" /> : <Redirect to="/" />}
				</Switch>
				);
		}

    return (
      <div >
	    <BrowserRouter>
	        <Layout>
				{routes}	
	        </Layout>
      	</BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.token != null,
		building: state.burgerBuilder.building,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onReloadAuth: () => dispatch(actions.authCheckState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
