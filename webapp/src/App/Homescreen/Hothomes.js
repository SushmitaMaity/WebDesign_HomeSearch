import React from "react";
import { Button } from "react-bootstrap";
import "./Hothomes.scss";
import { Link } from "react-router-dom";

//Adding constructor
export class Hothomes extends React.Component {
    constructor(props) {
      super(props);
     
      };
      render (){
        return (
          // Adding image and description about hot homes
            <div className="img-wrapper">
            <img className="img-responsive"
                 src="assets/istockphoto-1270220684-170667a.jpeg"></img>
            <div className="img-overlay">
              <p className="para">In competitive real estate markets, speed is critical. HomesByASAP aims to give you an advantage by identifying Hot Homes™ that are likely to sell quickly, so you know which homes to go see in person right away.

                 A Hot Home is a home for sale that is expected to be among the most competitive homes on the market, according to the HomesByASAP Hot Homes algorithm.

                 The Hot Homes algorithm automatically calculates the likelihood by analyzing more than 500 attributes of each home - including price, property type, and neighborhood - as well as buyer preferences in the area.</p>
            {/* link to the hot homes page */}
            <Link to="/hothomes">
            <Button className="hothomesbtn" variant="outline-light">Hot Homes</Button>
              </Link>
            </div>
          </div>
        )
      }
    }
    //exporting it to the hot homes display
    export default Hothomes;