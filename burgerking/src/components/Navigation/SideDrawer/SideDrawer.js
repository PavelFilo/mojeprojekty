import React from 'react';

import Logo from '../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop.js';
import Aux from '../../../hoc/Auxilliary/Auxilliary.js';

const SideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close]
	if (props.show) {
		attachedClasses = [classes.SideDrawer, classes.Open]
	}
	return(
		<Aux>
			<Backdrop show={props.show} clicked={props.clicked}/>
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo height='100%' />
				</div>
				<nav>
					<NavigationItems isLogged={props.isLogged}/>

				</nav>
			</div>
		</Aux>
		);
};

export default SideDrawer;