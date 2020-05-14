import React from 'react';

import classes from './Menubutton.css';

const MenuButton = (props) => (

	<div className={classes.MenuButton} onClick={props.clicked}>
		<div></div>
		<div></div>
		<div></div>
	</div>

);

export default MenuButton;