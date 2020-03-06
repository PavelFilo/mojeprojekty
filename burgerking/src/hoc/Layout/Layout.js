import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxilliary/Auxilliary.js';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.js';

class Layout extends Component {
		
	state = {
		showSideDrawer: false
	};

	sideDrawerToggle = () => {
		if (this.state.showSideDrawer) {
			this.setState({showSideDrawer: false})
		} else this.setState({showSideDrawer: true});
	};


	render() {

		return(
			<Aux>	
				<Toolbar isLogged={this.props.isAuth} clicked={this.sideDrawerToggle} />
				<SideDrawer isLogged={this.props.isAuth} show={this.state.showSideDrawer} clicked={this.sideDrawerToggle} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
			);
	}
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token != null,
	}
}

export default connect(mapStateToProps)(Layout);