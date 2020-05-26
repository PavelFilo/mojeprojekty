import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './ThirdStep.module.css';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index'; 
import Input from '../../../components/UI/Input/Input';
import { checkValidity } from '../../../components/UI/Input/checkValidity';

import Spinner from '../../../components/UI/Spinner/Spinner';

class ThirdStep extends Component {

	state = {
		controls: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Názov hotela *'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
			},
			adresa: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Adresa hotela *'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
			},
			kraj: {
				elementType: 'select',
				elementConfig: {
					type: 'text',
					placeholder: 'Kraj',
					options: [
						{
							value: 'BB',
							displayValue: 'Bánskobystrický kraj'
						},
						{
							value: 'KE',
							displayValue: 'Košický kraj'
						},
						{
							value: 'BA',
							displayValue: 'Bratislavský kraj'
						},
						{
							value: 'TN',
							displayValue: 'Trnavský kraj'
						},
						{
							value: 'TT',
							displayValue: 'Trenčianský kraj'
						},
						{
							value: 'ZI',
							displayValue: 'Žilinský kraj'
						},
						{
							value: 'NA',
							displayValue: 'Nitrianský kraj'
						},
						{
							value: 'PR',
							displayValue: 'Prešovský kraj'
						}
					]
				},
				value: 'BB',
				validation: {
					required: true
				},
				valid: true,
				touched: false,
			},
			popis: {
				elementType: 'textarea',
				elementConfig: {
					type: 'text',
					placeholder: 'Popis Hotela * ',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			pocetHosti: {
				elementType: 'textarea',
				elementConfig: {
					type: 'text',
					placeholder: 'Informácie o izbách',
				},
				value: '',
				validation: {
				},
				valid: true,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email * '
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
			},
			telefon: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Telefon (zadajte v tvare 0912345678) *'
				},
				value: '',
				validation: {
					required: true,
					minLength: 10,
					maxLength: 14,
					isNumber: true,
				},
				valid: false,
				touched: false,
			},
			imgPath: {
				elementType: 'file',
				elementConfig: {
					type: 'file',
					placeholder: 'photo'
				},
				value: [],
				validation: {},
				valid: false,
				touched: false,
			},
			dalsieInfoNadpis: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Nadpis sekcie'
				},
				value: '',
				label: 'Ďalšie informácie',
				validation: false,
				valid: true,
				touched: false,
			},
			dalsieInfoText: {
				elementType: 'textarea',
				elementConfig: {
					type: 'text',
					placeholder: 'Ďalšie informácie o ubytovaní'
				},
				value: '',
				validation: false,
				valid: true,
				touched: false,
			}
		},
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
			if (this.state.controls[formElementId].value !== '') {
				formData[formElementId] = this.state.controls[formElementId].value;
			} else console.log(this.state.controls[formElementId].value);
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
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementsArray.map(formElement => {
			if (formElement.config) {
				return (<Input
					key={formElement.id}
					label={formElement.config.label}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					check={(event) => this.inputOutFocusHandler(event, formElement.id)}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) => this.inputChangedHandler(event, formElement.id)}
				/>);
			} else return null;
		});

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
				<div className={classes.formDiv}>
					<form className={classes.AuthForm}>
						{form}
						{this.state.i > 0 ? <span onClick={this.onRemoveSection} className={classes.Pridat}>- Odstrániť sekciu</span> : null}
						<br/>
						<span onClick={this.onAddSection} className={classes.Pridat}>+ Pridať sekciu</span>
						{errorMessage}
						<p className={classes.error}>{this.state.validity}</p>
						<button onClick={event => this.onSubmitHandler(event)} disabled={!this.state.validity}>Pridať hotel</button>
					</form>
				</div>
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