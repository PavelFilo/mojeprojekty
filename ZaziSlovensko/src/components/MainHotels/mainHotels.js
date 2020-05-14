import React, { useEffect } from 'react';


import * as actions from '../../store/actions/hotelItems';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import MainHotel from '../../containers/mainHotel/mainHotel';
import classes from './mainHotels.module.css';

const MainHotels = (props) => {
    const { onFetchAccommodations } = props;

    useEffect(() => {
        onFetchAccommodations();
    }, [onFetchAccommodations])

    let hotels = <Spinner />
    if (props.hotels) {
        const slicedHotels = props.hotels.slice(1,7);
        hotels = slicedHotels.map((hotel, index) => {
            return <MainHotel key={index}  kraj={hotel.kraj} hotels={props.hotels} />
        })
    }

    return (
        <div className={classes.MainHotels}>
            <h1>Hotel si môžete vybrať ihneď</h1>

            {hotels}
        </div>
        )
}
const mapStateToProps = state => {
    return {
        hotels: state.hotelItems.hotels,
        loading: state.hotelItems.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccommodations: () => dispatch(actions.fetchAccommodations(''))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainHotels);