import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {

	let inputElement = null;
	const inputClasses = [classes.InputElement];
	let validationError = null;
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
		validationError = <p className={classes.ValidationError}>Zadajte správny formát</p>;
	}


	switch(props.elementType) {
		case ('input'):
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onBlur={props.check}
				onChange={props.changed} />;
			break;
		case ('textarea'):
			inputElement = <textarea
				className={classes.textarea} 
				onBlur={props.check}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />;
			break;
		case ('select'):
			inputElement = (
				 <select 	
				 	className={inputClasses.join(' ')} 
					value={props.value}
					onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value}  value={option.value} >
							{option.displayValue}
						</option>	
					))}
				 </select>
				);
			break;
		case ('file'):
			inputElement = <input
				type="file"
				id="avatar" name="avatar"
				accept="image/png, image/jpeg"
				onChange={props.changed}
			/>;
			break;
		default: 
			inputElement = <input 
				className={inputClasses.join(' ')} 
				{...props.elementConfig}
				 value={props.value} onChange={props.changed}/>;



	}


	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
}

export default Input;