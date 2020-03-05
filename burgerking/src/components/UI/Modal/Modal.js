import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary.js';
import Backdrop from '../Backdrop/Backdrop.js';

class Modal extends Component {

	shouldComponentUpdate(nextProps,nextState) {
		if (nextProps.children !== this.props.children || nextProps.show !== this.props.show) {
			return true;
		} else return false;
	}
	
	render() {
		
		return(
			<Aux>
				<Backdrop show={this.props.show}
							clicked={this.props.modalClose} />	
				<div className={classes.Modal}
					 style={{transform: this.props.show ? 'translateY(-20px)' : 'translateY(-200vh)'}} >
					{this.props.children}
				</div>

			</Aux>
		);
	};
};

export default Modal;
