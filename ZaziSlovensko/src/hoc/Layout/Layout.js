import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxilliary/Auxilliary.js';
import classes from './Layout.module.css';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import Footer from '../../components/footer/footer';
import Modal from '../../components/UI/Modal/Modal';

import Login from '../../containers/Authentication/Login/Login';
import SignUp from '../../containers/Authentication/SignUp/SignUp';

class Layout extends Component {
		
	state = {
		showSideDrawer: false,
		showModal: false,
		modalLogin: true 
	};


	componentDidUpdate() {
		if (this.props.isLoggedIn && this.state.showModal) {
			this.setState({ showModal: false });
		}
	}

	sideDrawerToggle = () => {
		if (this.state.showSideDrawer) {
			this.setState({showSideDrawer: false})
		} else this.setState({ showSideDrawer: true });
	};

	toggleModal = (type) => {
		if (this.state.showModal) {
			this.setState({ showModal: false });
		} else this.setState({
			showModal: true,
			modalLogin: type
		});
	}

	toggleType = () => {
		this.setState({ modalLogin: !this.state.modalLogin })
	}

	render() {
		
		return(
			<Aux>	
				<Modal
					show={this.state.showModal}
					login={this.toggleModal}>
					{this.state.modalLogin ? <Login hideModal={this.toggleModal} changeType={this.toggleType} /> : <SignUp changeType={this.toggleType} />}
				</Modal >
				<Toolbar
					clicked={this.sideDrawerToggle}
					isLogged={this.props.isLoggedIn}
					login={this.toggleModal}
					show={this.state.showSideDrawer} />
				<SideDrawer
					show={this.state.showSideDrawer}
					isLogged={this.props.isLoggedIn}
					clicked={this.sideDrawerToggle}
					login={this.toggleModal}
				/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
				<Footer />
			</Aux>
			);
	}
};


const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.token != null,
	}
}

export default connect(mapStateToProps)(Layout);