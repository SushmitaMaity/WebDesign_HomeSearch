import React from 'react'
import './ListingImages.scss'
import ImageSlider from "../SellerHome/ImageSlider"

const ListingImages = (props) => {

    // get the card component
    const cardInfo = props.cardDetails

    return (
        <div className="listingImageBody">
            {/* calling the image slider and passing the images to display it as a slider */}
            <ImageSlider picsArray={cardInfo.pics} />
        </div>
    );
}
export default ListingImages