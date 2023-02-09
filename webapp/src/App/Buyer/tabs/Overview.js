import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Overview = (props) => {

  //Getting the particular house object ListingInformationDetails component
  const cardInfo = props.cardInfo
  return (
    <div>
      <h7>{cardInfo.description}</h7>
    </div>
  );
}

export default Overview;