import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import storage from '../../instances/firebase.js';
import classes from './accommodation.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

const Accommodation = React.memo((props) => {
    const [state, setState] = useState({
        src: [null, null]
    });
    let hotel, myHotel = <Spinner />, images;
    const meno = new URLSearchParams(props.location.search).get("name");
    if (props.accommData && !hotel) {
        console.log(props.accommData)
        if (props.accommData.length === 0) {
            props.history.push('/error');
            window.location.reload(false);

        }

        [hotel] = props.accommData.filter(hotel => hotel.name === meno );
        if (state.src) {
            images = state.src.map((src, id) => {
                return (
                    <img className={classes.image} src={src} key={id} alt='chata' />
                )
            });
        }
        let keys;
        if (hotel.dalsieInfo) {
            keys = Object.keys(hotel.dalsieInfo).map((info, index) => (
                <div key={index}>
                    <h3>{info}</h3>
                    <p>{hotel.dalsieInfo[info]}</p>
                </div>
            ));
        }
        myHotel = (
            <div key="hotel">
                <div className={classes.Images}>
                    {images}
                </div>
                <div className={classes.Text}>
                    <h1>{hotel.name}</h1>
                    <p>{hotel.popis}</p>
                    <p>Adresa: {hotel.adresa}</p>
                    <p>Ubytovanie: {hotel.pocetHosti}</p>
                    <div className={classes.DalsieInfo}>
                        {keys}
                    </div>
                    <div className={classes.Kontakt}>
                        <p><strong>Adresa:</strong>{hotel.adresa}</p>
                        <p><strong>Telefon:</strong>{hotel.telefon}</p>
                        <p><strong>Email:</strong>{hotel.email}</p>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (!props.accommData) {
            let query = '';
            if (meno) {
                query = `?orderBy="name"&equalTo="${meno}"`;
            }
            props.onFetchAccommodations(query);

        }
        if (props.accommData) {
            storage.ref(hotel.imgPath).listAll().then((hotelImg) => {
                const fetchedImages = [];
                for (let key in hotelImg.items) {
                    fetchedImages.push(hotelImg.items[key].fullPath);
                }
                const fetchedSrcs = [];
                for (let key in fetchedImages) {

                    storage.ref().child(fetchedImages[key]).getDownloadURL().then(url => {
                        fetchedSrcs.push(url);
                        setState({ src: fetchedSrcs });
                    });


                }


            });
        }
    }, [props, setState, hotel, meno])

    return (
        <div className={classes.Accommodation}>
            {myHotel}
        </div>
    )
});

const mapStateToProps = state => {
    return {
        accommData: state.hotelItems.hotels,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccommodations: (query) => dispatch(actions.fetchAccommodations(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accommodation);