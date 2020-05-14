import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';
import Logo from '../../../assets/images/Zlogo.png';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop.js';
import SearchBar from '../Searchbar/searchbar';
import NavList from '../NavList/NavList';
import Aux from '../../../hoc/Auxilliary/Auxilliary.js';

const SideDrawer = (props) => {
	const [state, setState] = useState({
		name: ''
	});

	const onSearchHotelHandler = (event) => {
		event.preventDefault();
		props.clicked();
		props.history.push('/hotely?name=' + state.name);
		
	}

	const onChangeHandler = (event) => {
		setState({ name: event.target.value });
	}

	let attachedClasses = [classes.SideDrawer, classes.Close]
	if (props.show) {
		attachedClasses = [classes.SideDrawer, classes.Open]
	}
	return(
		<Aux>
			<Backdrop show={props.show} clicked={props.clicked}/>
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<img className={classes.Logo} src={Logo} alt="logo" />
				</div>

					<SearchBar
						onChangeHandler={onChangeHandler}
						onSearchHandler={onSearchHotelHandler} />

				<nav onClick={props.clicked}>
					<NavList login={props.login} />
				</nav>
			</div>
		</Aux>
		);
};

export default withRouter(SideDrawer);