import React from 'react';


import classes from './Error.module.css';
import { Link } from 'react-router-dom';

const Error = props => {

	return (
		<>
			<div className={classes.ErrorDiv}>
				<div className={classes.Xdiv}></div>
				<div className={classes.Error}>
					<p><strong>404. Error -</strong> tu ste sa dostať nechceli</p> 
					<Link to="/">Späť domov</Link>
				</div>
			</div>
		</>
	);
};

export default Error;
