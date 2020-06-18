import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import classes from './NavList.module.css';

const NavList = (props) => {
    let links = (
        <>
            <li><NavLink activeClassName={classes.Active} to='/pridat'>Pridať hotel</NavLink></li>
            <li onClick={() => {
                props.onLogout();
                props.history.push('/');
            }}>Odhlásiť sa</li>

        </>
       
    )
    if (!props.isLoggedIn) {
        links = (
            <>
                <li onClick={() => props.login(true)}>Prihlasenie</li>
                <li onClick={() => props.login(false)}>Registrácia</li>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavList));
