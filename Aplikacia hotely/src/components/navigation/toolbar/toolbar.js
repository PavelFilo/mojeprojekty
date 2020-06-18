import React, { Component } from 'react';

import { NavLink, withRouter } from 'react-router-dom';

import MenuButton from './MenuButton/MenuButton.js';
import NavList from '../NavList/NavList';
import SearchBar from '../Searchbar/searchbar';
import classes from './toolbar.module.css';
import LogoZ from '../../../assets/images/Zlogo.png';

class Toolbar extends Component {

    state = {
        name: ''
    }



    onSearchHotelHandler = (event) => {
        event.preventDefault();
        this.props.history.push('/hotely?name=' + this.state.name);
        window.location.reload(false);
    }

    onChangeHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    render() {

    
        return (
            <header className={classes.Toolbar}>
                <NavLink to="/" >
                    <img className={classes.Logo} src={LogoZ} alt="logo" />
                </NavLink>
                <MenuButton show={this.props.show} className={classes.Button} clicked={this.props.clicked}/>
                <SearchBar
                    onChangeHandler={this.onChangeHandler}
                    onSearchHandler={this.onSearchHotelHandler}
                    text=' Hľadaj podľa názvu alebo mesta'/>
                <div className={classes.display}>
                    <NavList isLogged={this.props.isLogged} login={this.props.login} display />
                </div>
            </header>
        );
    }
}

export default withRouter(Toolbar);