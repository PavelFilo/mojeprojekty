﻿import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './searchbar.module.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary.js';

const SearchBar = (props) => {
	return(
		<Aux>
			<form className={classes.Form} onSubmit={(event) => props.onSearchHandler(event)}>
				<FontAwesomeIcon className={classes.search} icon={faSearch} />
				<input type="text" onChange={event => props.onChangeHandler(event)} placeholder={props.text} />
			</form>
		</Aux>
	);
};

export default SearchBar;