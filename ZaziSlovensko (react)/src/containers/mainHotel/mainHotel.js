import React, { Component } from 'react';


import HotelItem from '../../components/hotelItem/hotelItem';
import Aux from '../../hoc/Auxilliary/Auxilliary';


class MainHotels extends Component {


    render() {
        let hotels = null;
        if (this.props.kraj && this.props.hotels) {
            hotels = this.props.hotels.filter(hotel => {
                return hotel.kraj === this.props.kraj
            });;
        }

        let Accommodations = null;
        if (this.props.hotels != null) { 
            Accommodations = (
                <HotelItem
                    meno={hotels[0].name}   
                    imageSrc={hotels[0].imgPath}
                    main />
            );
        }
        return (
            <Aux>
                {Accommodations}
            </Aux>
        );
    }
}



export default (MainHotels);