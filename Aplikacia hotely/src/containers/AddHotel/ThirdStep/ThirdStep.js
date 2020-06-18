import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './ThirdStep.module.css';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../components/UI/Input/checkValidity';
import formData from './data/FormData.json';
import FormDiv from '../../../components/AddhotelForm/AddHotelForm';

import Spinner from '../../../components/UI/Spinner/Spinner';

class ThirdStep extends Component {
	
	state = {
		controls: {...formData.controls},
		validity: false,
		i: 0
	};

	inputChangedHandler = (event, controlName) => {
		let updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
			}
		};
		if (controlName === 'imgPath') {
			updatedControls = {
				...this.state.controls,
				imgPath: {
					...this.state.controls.imgPath,
					value: event.target.files[0],
					valid: true,
				}
			};
		}

		let formIsValid = true;
		for (let input in updatedControls) {
			formIsValid = updatedControls[input].valid && formIsValid;
		}

		this.setState({ controls: updatedControls, validity: formIsValid });
	}

	inputOutFocusHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true,
			}
		};
		let formIsValid = true;
		for (let input in updatedControls) {
			formIsValid = updatedControls[input].valid && formIsValid;
		}

		this.setState({ controls: updatedControls, validity: formIsValid });
	}
	
	onAddSection = () => {
		const dalsieInfoNadpis = 'dalsieInfoNadpis' + this.state.i;
		this[dalsieInfoNadpis] = this.state.controls.dalsieInfoNadpis;

		const dalsieInfoText = 'dalsieInfoText' + this.state.i;
		this[dalsieInfoText] = this.state.controls.dalsieInfoText;

		const section = {};
		section[dalsieInfoNadpis] = this[dalsieInfoNadpis];
		section[dalsieInfoText] = this[dalsieInfoText];
		this.setState({
			controls: { ...this.state.controls, ...section },
			i: this.state.i + 1
		});
	}

	onRemoveSection = () => {
		const dalsieInfoNadpis = 'dalsieInfoNadpis' + (this.state.i - 1);
		const dalsieInfoText = 'dalsieInfoText' + (this.state.i - 1);

		let controls = this.state.controls;


		controls = Object.keys(controls).filter((control) => {
			if (control === dalsieInfoNadpis) {
				return false;
			} else if (control === dalsieInfoText) {
				return false;
			} else return true;
		}).reduce((obj, key) => {
			obj[key] = controls[key];
			return obj;
		}, {});

		this.setState({
			controls: controls,
			i: this.state.i - 1
		});
	}

	onSubmitHandler = event => {
		event.preventDefault();
		const formData = {};
		for (let formElementId in this.state.controls) {
			if (formElementId === 'city' ||	formElementId === 'street' || formElementId === 'houseNumber' || formElementId === 'PSC') {
				formData['address'] = {
					...formData['address'],
					[formElementId]: this.state.controls[formElementId].value,
				}
			} else {
				formData[formElementId] = this.state.controls[formElementId].value;
			}
		}
		let data = {
			...formData,
			imgPath: this.state.controls.name.value + '/',
			userId: this.props.userId
		}
		let dalsieInfoo = null;
		if (this.state.controls.dalsieInfoNadpis.value !== '' && this.state.controls.dalsieInfoText.value !== '') {

			 dalsieInfoo = { [this.state.controls.dalsieInfoNadpis.value]: this.state.controls.dalsieInfoText.value };
			for (let k = 0; this.state.i > k; k++) {
				const dalsieInfoNadpis = 'dalsieInfoNadpis' + k;
				const dalsieInfoText = 'dalsieInfoText' + k;
				if (this.state.controls[dalsieInfoNadpis].value !== '' && this.state.controls[dalsieInfoText].value !== '') {
					dalsieInfoo = {
						...dalsieInfoo,
						[this.state.controls[dalsieInfoNadpis].value]: this.state.controls[dalsieInfoText].value
					}
				}
			}
		}
		data['dalsieInfo'] = { ...dalsieInfoo };

		data = Object.keys(data).filter((control) => {
			if (control.includes('dalsieInfoNadpis')) {
				return false;
			} else if (control.includes('dalsieInfoText')) {
				return false;
			} else return true;
		}).reduce((obj, key) => {
			obj[key] = data[key];
			return obj;
		}, {});
		this.props.onSubmitHotel(data, this.props.token, this.state.controls.imgPath.value);

	}

	render() {

		let loading = null;
		if (this.props.loading) {
			loading = <Modal show><h2>Príspevok sa spracúvava</h2><Spinner /></Modal>
		} 

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p style={{ 'color': '#c3272a' }}>{this.props.error.message}</p>
			)
		}

        return (
			<div className={classes.AddHotel}>
				{this.props.done ? <Redirect to='/' /> : null}
                <div className={classes.Steps}>
                    <h2>Sme radi že ste prišli až sem</h2>
                    <h3>Krok Tretí</h3>
				</div>
				{ loading }
                <div className={classes.Why}>
                    <h1>Posledný krok máte pred sebou</h1>
                    <p>Už vám zostáva len vyplniť formulár nižšie a vaše ubytovanie bude pripravené</p>
                </div>
				<h2>Pridanie hotela</h2>
				<FormDiv
					counter={this.state.i}
					controls={this.state.controls}
					valid={this.state.validity}
					remove={this.onRemoveSection}
					addSection={this.onAddSection}
					submitForm={this.onSubmitHandler}
					inputFocusOut={this.inputOutFocusHandler}
					inputChangedHandler={this.inputChangedHandler}
					errorMessage={errorMessage}
				/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.userId,
		token: state.auth.token,
		loading: state.addHotel.loading,
		done: state.addHotel.statusDone,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSubmitHotel: (orderData, token, img) => dispatch(actions.addHotel(orderData, token, img)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdStep);