import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop.js';

const modal = props => {

		return(
			<>
				{props.login ? <Backdrop show={props.show} clicked={props.login} /> : <Backdrop show={props.show} clicked={() => { }} />}	
				<div className={classes.Modal}
					 style={{transform: props.show ? 'translateY(-20px)' : 'translateY(-200vh)'}} >
					{props.children}
				</div>

			</>
		);
};

export default React.memo(modal/*, ((prevProps, nextProps) => { nextProps.children === prevProps.children && nextProps.show === prevProps.show })*/);
