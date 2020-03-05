import React from 'react';

import classes from './BurgerControls.css';

const BurgerControl = (props) => {
	return (
			<div className={classes.BurgerControl}>
				<div className={classes.label}>{props.label}</div>
				<button onClick={props.more} className={classes.more}>More</button>
				<button onClick={props.less} className={classes.less} disabled={props.disabled}>Less</button>
				<p></p>
			</div>
		)
}

export default BurgerControl;