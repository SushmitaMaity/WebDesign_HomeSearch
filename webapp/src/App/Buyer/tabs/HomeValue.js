import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeValue = (props) => {

  //Getting the particular house object ListingInformationDetails component
  const cardInfo = props.cardInfo
  return (
    <div>
         <h7>Estimate Price : $ {cardInfo.price}</h7>
    </div>
  );
}

export default HomeValue;
