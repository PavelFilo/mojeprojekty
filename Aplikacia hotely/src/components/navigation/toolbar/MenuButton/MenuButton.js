import React, { useState, useEffect } from 'react';

import classes from './Menubutton.module.css';

const MenuButton = (props) => {

	const [change, setChange] = useState([classes.MenuButton]);
	const { show } = props;
 
	const Toggle = () => {
		if (change.length > 1) {
			setChange([classes.MenuButton]);
		} else {
			setChange([...change, classes.change]);
		};
	}
	useEffect(() => {
		if (!show) {
			setChange([classes.MenuButton]);
		}
	}, [show]); 
	

	return (
		<div className={change.join(' ')} onClick={() => { props.clicked(); Toggle() }}>
			<div className={classes.bar1}></div>
			<div className={classes.bar2}></div>
			<div className={classes.bar3}></div>
		</div>

	);
}
export default MenuButton;