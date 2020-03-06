import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.css';


const NavigationItems = (props) => {



	return (

	<ul className={classes.NavigationItems}>
		<li><NavLink activeClassName={classes.active} exact to='/' >Burger Builder</NavLink></li>
			{props.isLogged
				? < li > <NavLink activeClassName={classes.active} exact to='/orders' >Orders</NavLink></li>
				: null}
			{!props.isLogged
				? <li><NavLink activeClassName={classes.active} exact to='/auth' >Authentification</NavLink></li>
				: < li > <NavLink activeClassName={classes.active} exact to='/logout' >Log Out</NavLink></li>}
	</ul>
);

} 


export default NavigationItems