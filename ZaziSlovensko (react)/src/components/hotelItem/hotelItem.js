import React, { useState, useEffect }from 'react';
import storage from '../../instances/firebase.js';

import { NavLink } from 'react-router-dom';

import classes from './hotelItem.module.css';
//import Photo from '../../assets/images/chata.jpg'; 


const HotelItem = (props) => {
     const [src, setSrc] = useState({
         src: null,
         path: null
    })
   

    useEffect(() => {
        let isCanceled = false;
        storage.ref(props.imageSrc).listAll().then((hotelImg) => {
            if (!isCanceled) {
                setSrc({ path: hotelImg.items[0].fullPath });
            }
        });
        return () => isCanceled = true;
    }, [props.imageSrc]);


    
    useEffect(() => {
        let isCanceled = false;
        if (src.path) {
            storage.ref().child(src.path).getDownloadURL().then(url =>{
                if (!isCanceled) {
                    setSrc({ src: url });
                }
            });
        }
        return () => isCanceled = true;
    }, [src.path]);

    return (
        <div className={props.main ? classes.MainHotelItem : classes.hotelItem}>
            <NavLink exact to={'/acco?name=' + props.meno}>
                <figure>
                    <img src={src.src} alt="ukazka hotela" />
                </figure>
            </NavLink>

            <ul>
                <li><NavLink exact to={'/acco?name='+ props.meno}><h3>{props.meno}</h3></NavLink></li>
                <li>{props.popis}</li>
                <li>{props.adresa}</li>
            </ul>
        </div>
        )
}

export default HotelItem;