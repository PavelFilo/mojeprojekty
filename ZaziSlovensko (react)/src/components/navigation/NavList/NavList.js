import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import classes from './NavList.module.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
const NavList = (props) => {
    let links = (
        <Aux>
            <li><NavLink activeClassName={classes.Active} to='/pridat'>Pridať hotel</NavLink></li>
            <li onClick={() => props.onLogout()}>Odhlásiť sa</li>

        </Aux>
       
    )
    if (!props.isLoggedIn) {
        links = (
            <Aux>
                <li onClick={() => props.login(true)}>Prihlasenie</li>
                <li onClick={() => props.login(false)}>Registrácia</li>
            </Aux>
        )
    }

    return (
        <ul className={classes.NavList}>
            {links}
        </ul>
        )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
