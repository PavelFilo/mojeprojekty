import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './map.module.css';
import MainHotels from '../../components/MainHotels/mainHotels';
import Paths from '../../components/paths/Paths';

class Map extends Component {
    state = {
        kraj: 'Bratislavský kraj'
    }

    zmenaKraja = (nazovKraja) => {
        this.setState({kraj: nazovKraja + ' kraj'})
    }

    render() {



        return (
            <>
                <h1 className={classes.Nadpis}>Vyber si kraj</h1>
                <div className={classes.mapDiv}>
                    
                    <p>{this.state.kraj}</p>
                    <Paths onHoverHandler={this.zmenaKraja} />
                </div>
                <div className={classes.Kraje}>
                    <ul>
                        <li>
                            <NavLink exact to={'/hotely?kraj=BA'}>Bratislavský kraj</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={'/hotely?kraj=TN'}>Trnavský kraj</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={'/hotely?kraj=TI'}>Trenčiansky kraj</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={'/hotely?kraj=NI'}>Nitriansky kraj</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={'/hotely?kraj=ZI'}>Žilinský kraj</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={'/hotely?kraj=BB'}>BánskoBystrický kraj</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={'/hotely?kraj=PR'}>Prešovský kraj</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={'/hotely?kraj=KE'}>Košický kraj</NavLink>
                        </li>
                    </ul>
                </div>
                <MainHotels />

            </>
            );
    }
}

export default Map;