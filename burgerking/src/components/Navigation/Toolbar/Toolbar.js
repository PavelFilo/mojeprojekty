import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo.js';
import Navigation from '../NavigationItems/NavigationItems.js';
import MenuButton from './MenuButton/MenuButton.js';


const Toolbar = (props) => (
	<header className={classes.Toolbar}>
		<MenuButton  clicked={props.clicked}/>
		<Logo height='80%'/>
		<nav className={classes.DesktopOnly}>
			<Navigation isLogged={props.isLogged} />
		</nav>
	</header>
);

export default Toolbar;