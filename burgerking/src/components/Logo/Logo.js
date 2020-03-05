import React from 'react';

import bLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';


const Logo = (props) => (
	<div style={{height: props.height}} className={classes.Logo}>
		<img alt='logo' src={bLogo}/>
	</div>
);


export default Logo;