import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import classes from './GoogleMap.module.css';


const MapGoogle =  React.memo((props) => {

    const containerStyle = {
        height: '400px'
    };

    return (
        <div className={classes.MapDiv}>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                        lat: Number(props.coordinates[0]),
                        lng: Number(props.coordinates[1])
                    }}
                    zoom={14}
                   
                >
                    <Marker position={{
                        lat: Number(props.coordinates[0]),
                        lng: Number(props.coordinates[1])
                    }} />
                    <></>
                </GoogleMap>
            </LoadScript>
        </div>
    );
})

export default MapGoogle