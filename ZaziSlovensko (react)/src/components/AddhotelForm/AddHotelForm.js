import React from 'react';

import classes from './AddHotelForm.module.css';
import Input from '../UI/Input/Input';

const ThirdStep = (props) => {

		const formElementsArray = [];
		for (let key in props.controls) {
			formElementsArray.push({
				id: key,
				config: props.controls[key]
			});
		}

		let form = formElementsArray.map(formElement => {
			if (formElement.config) {
				return (<Input
					key={formElement.id}
					label={formElement.config.label}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					check={(event) => props.inputFocusOut(event, formElement.id)}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) => props.inputChangedHandler(event, formElement.id)}
				/>);
			} else return null;
		});

		return (
			<div className={classes.formDiv}>
				<form className={classes.AuthForm}>
					{form}
					{props.counter > 0 ? <span onClick={props.remove} className={classes.Pridat}>- Odstrániť sekciu</span> : null}
					<br />
					<span onClick={() => props.addSection()} className={classes.Pridat}>+ Pridať sekciu</span>
					{props.errorMessage}
					<p className={classes.error}>{props.valid}</p>
					<button onClick={event => props.submitForm(event)} disabled={!props.valid}>Pridať hotel</button>
				</form>
			</div>
		);
}

export default ThirdStep;