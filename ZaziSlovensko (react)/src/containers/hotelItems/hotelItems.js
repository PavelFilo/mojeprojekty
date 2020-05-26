import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import classes from './hotelItems.module.css';
import HotelItem from '../../components/hotelItem/hotelItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxilliary/Auxilliary';


class HotelItems extends Component {

    componentDidMount() {
        let query = '';
        if (new URLSearchParams(this.props.location.search).get("kraj")) {
            const kraj = new URLSearchParams(this.props.location.search).get("kraj");
            query = `?orderBy="kraj"&equalTo="${kraj}"`;
        }
        this.props.onFetchAccommodations(query);
    }

    shouldComponentUpdate(nextProps) {
        if (new URLSearchParams(this.props.location.search).get("name")) {
            return true;
        } else return nextProps.hotels !== this.props.hotels;
    }

    comparationHandler = (povodne, hladane) => {

        const hladaneString = hladane.toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let povodneString = povodne.name.toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let povodneMesto = povodne.adresa.toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (povodneMesto.includes(hladaneString)) {
            return true;
        } else {
            if (povodneString.includes(hladaneString)) {
                return true;

            }
            else {
                povodneString = povodneString.substring(0, hladane.length);
                if (povodneString === hladaneString) {
                    return true;
                }
                else { return false;}
            }
        }
    }

    render() {
        let meno;
        if (this.props.location) {
            meno = new URLSearchParams(this.props.location.search).get("name");
        }
            let hotels = null;
        if (meno && this.props.hotels) {
            hotels = this.props.hotels.filter(hotel => {
                return this.comparationHandler(hotel, meno)
            });
        } else {
            hotels = this.props.hotels;
        }

        
        let Accommodations = <Spinner />;

        
        if (this.props.hotels != null) {
            Accommodations = hotels.map((hotel, index) => {
                let maxLength = 150;
                if (window.screen.width < 900) {
                    maxLength = 100; 
                    if (window.screen.width < 600 && window.screen.width > 500) {
                        maxLength = 60; 
                    }
                }
                let popis = hotel.popis.substr(0, hotel.popis.lastIndexOf(' ', maxLength))

                return (
                    <HotelItem
                        key={index}
                        id={index}
                        meno={hotel.name}
                        adresa={'Adresa:' + hotel.adresa}
                        pocetHosti={hotel.pocetHosti}
                        popis={popis+'...'}
                        imageSrc={hotel.imgPath} />
                );
            });
            if (Accommodations.length === 0) {
                Accommodations = (
                    <div className={classes.ziadneUbytovanie}>
                        <div>
                            <p>Pre toto kritérium sa žiadne ubytovanie nenašlo</p>
                            <NavLink className={classes.link} to='/'>Späť na hlavnú stránku</NavLink>
                        </div>
                    </div>
                )
            }
   
        }
            return (
                <Aux>   
                    {Accommodations}
                </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        hotels: state.hotelItems.hotels,
        loading: state.hotelItems.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccommodations: (query) => dispatch(actions.fetchAccommodations(query))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HotelItems);