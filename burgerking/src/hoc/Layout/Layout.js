import React, {Component} from 'react';

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
				<Toolbar clicked={this.sideDrawerToggle} />
				<SideDrawer show={this.state.showSideDrawer} clicked={this.sideDrawerToggle} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
			);
	}
};

export default Layout;