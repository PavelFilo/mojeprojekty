import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';
import Checkout from './containers/checkout/Checkout.js';
import Orders from './containers/Orders/Orders.js';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div >
	    <BrowserRouter>
	        <Layout>
	        	<Switch>
	        		<Route path='/orders' component={Orders} />
		        	<Route path='/checkout' component={Checkout} />
					<Route path='/auth' exact component={Auth} />
					<Route path='/' exact component={BurgerBuilder} />
	        	</Switch>
	        </Layout>
      	</BrowserRouter>
      </div>
    );
  }
}

export default App;
