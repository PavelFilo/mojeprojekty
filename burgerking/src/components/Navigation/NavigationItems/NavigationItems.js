import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.css';


const NavigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<li><NavLink activeClassName={classes.active} exact to='/' >Burger Builder</NavLink></li>
		<li><NavLink activeClassName={classes.active} exact to='/orders' >Orders</NavLink></li>
		<li><NavLink activeClassName={classes.active} exact to='/auth' >Authentification (not working yet)</NavLink></li>
	</ul>
);

export default NavigationItems;