import React, { useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    Circle,
    InfoWindow,
} from '@react-google-maps/api';
import './MapContainer.scss';

const MapContainer = (props) => {
    const cardInfo = props.cardInfo;
    const center = props.center;
    const [info, setInfo] = useState(false);
    const [lat, setlat] = useState(0);
    const [lng, setlng] = useState(0);
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');

    // method when marker is clicked
    const handleOpen = (location) => {
        // setting show info window as true and setting the values
        setInfo(true);
        setlat(location.lat);
        setlng(location.lng);
        setPrice(location.price);
        setCity(location.city);
        setName(location.name);
    };

    // method to close the marker
    const handleClose = () => {
        setInfo(false);
    };

    // size of the map
    const mapStyles = {
        height: '100vh',
        width: '100%',
    };

    return (
        <LoadScript googleMapsApiKey='AIzaSyBK-xckagY7ua5F0qsjtzDVnxL0-63BquU'>
            <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={center}>
                return (
                <>
                    {/* Plotting the marker points for all the address */}
                    {cardInfo.map((location, i) => (
                        <Marker
                            id={i}
                            key={i}
                            position={{ lat: location.lat, lng: location.lng }}
                            clickable
                            onClick={() => handleOpen(location)}
                        >
                            {/* To assign the 1 mile radious around the location */}
                            <Circle
                                center={{ lat: location.lat, lng: location.lng }}
                                radius={1609.34}
                            />
                        </Marker>
                    ))}
                    ;
                    {/*check if info window has to be displayed, the Infowindow will display the div components  */}
                    {info && (
                        <InfoWindow
                            onCloseClick={() => handleClose()}
                            position={{
                                lat: lat,
                                lng: lng,
                            }}
                        >
                            <div classNmae='infoBox'>
                                <div className='infoWindow'>
                                    <h6>{name}</h6>
                                </div>
                                <h6>Price: ${price}</h6>
                                <h6>
                                    <img src='/assets/marker_25px.png' alt="location" />
                                    City:{city}
                                </h6>
                            </div>
                        </InfoWindow>
                    )}
                </>
                )
            </GoogleMap>
        </LoadScript>
    );
};

export default MapContainer;
