import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';
import Checkout from './containers/checkout/Checkout.js';
import Orders from './containers/Orders/Orders.js';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';

class App extends Component {
	componentDidMount() {
		this.props.onReloadAuth();
	}
  render() {
    return (
      <div >
	    <BrowserRouter>
	        <Layout>
	        	<Switch>
	        		<Route path='/orders' component={Orders} />
		        	<Route path='/checkout' component={Checkout} />
					<Route path='/auth' exact component={Auth} />
					<Route path='/logout' exact component={Logout} />
					<Route path='/' exact component={BurgerBuilder} />
	        	</Switch>
	        </Layout>
      	</BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onReloadAuth: () => dispatch(actions.authCheckState())
	}
}

export default connect(null,mapDispatchToProps)(App);
