import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FactsandFeatures = (props) => {

  //Getting the particular house object ListingInformationDetails component
  const cardInfo = props.cardInfo

  return (
    <React.Fragment>
      <pre>  <h7>Home Type: {cardInfo.homeType}</h7>      <h7>Beds: {cardInfo.beds}</h7></pre>
      <pre>  <h7>Baths: {cardInfo.baths}</h7>          <h7>Square Feet: {cardInfo.squareFeet}</h7></pre>
      <pre>  <h7>HOA: {cardInfo.hoa}</h7>           <h7>Year Build: {cardInfo.year}</h7></pre>
    </React.Fragment>

  );
}

export default FactsandFeatures;