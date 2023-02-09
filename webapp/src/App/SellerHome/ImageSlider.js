

import React from 'react';
import './ImageSlider.scss';
import { Carousel } from 'react-bootstrap'
// import { HouseListings } from './HouseListings';

// import { useNavigate } from "react-router-dom";


//image slider for each house card element
const ImageSlider = (props) =>
{
    const images = props.picsArray
    console.log(images)

    //method to render a card as a carousel item
    const renderCard = (item, index) =>
    {
        console.log("/assets/" + item)
        console.log("http://localhost:3001/" + item)
        const a = "./assets/" + item
        return (
            // each card is a carousel item
            <Carousel.Item>
                <img
                    className="d-block w-100 seller-img-size"
                    //src={a}
                    src={"http://localhost:3001/" + item}
                    alt="Image"
                />
            </Carousel.Item>


        )
    }
    // return all images as a caraousel
    return (
        <Carousel>
            {images.map(renderCard)}
        </Carousel>
    )
}
export default ImageSlider;