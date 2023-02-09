import React from "react";
import { Card, Button} from "react-bootstrap";
import "./Buysellrent.scss";
import { Link } from "react-router-dom";

//constructor added
export class Buysellrent extends React.Component {
    constructor(props) {
      super(props);
     
      };
      render (){
          return (
            <>
            {/* cards added for buy, sell and rent */}
          <div className="flex-container"> 
            <div className="card1">
            <Card height="280px" width="250px">
            <Card.Img variant="top" src="assets/florian-schmidinger-b_79nOqf95I-unsplash.jpg"/>
            <Card.Body>
              <Card.Title>Buy a home</Card.Title>
              <Card.Text>
              “Let’s find the path to your dream home today!”
              </Card.Text>
              <div className="btnbuy">
                {/* link to buyer's page */}
              <Link to="/buyerViewListing">
              <Button variant="primary">BUY</Button>
              </Link>
              </div>
            </Card.Body>
          </Card> 
          </div>
          
          <div className="card2">
           <Card height="280px" width="250px">
            <Card.Img variant="top" src="assets/david-veksler-VW5YwCYbPyk-unsplash.jpg"/>
            <Card.Body>
              <Card.Title>Sell a home</Card.Title>
              <Card.Text>
              “Let Our Family Show Your Family the Way Home”
               {/* A home is made of hopes and dreams. We’ll help you find your home.” */}
              </Card.Text>
              <div className="btnsell">
                {/* link to seller's page */}
              <Link to="/sellerHome">
              <Button  variant="primary" >SELL</Button>
              </Link>
              </div>
            </Card.Body>
          </Card> 
          </div>
          
          <div className="card3">
            <Card height="280px" width="250px">
            <Card.Img variant="top" src="assets/shutterstock_160071032.jpg"/>
            <Card.Body>
              <Card.Title>Rent a home</Card.Title>
              <Card.Text>
              "Amenities you deserve & lease rates you’ll love."
              </Card.Text>
              <div className="btnrent">
                {/* link to buyer's page */}
              <Link to="/buyerViewListing">
              <Button variant="primary">Renting coming soon</Button>
              </Link>
              </div>
            </Card.Body>
          </Card>
          </div> 
          </div>
          </>
          );
      }
    } //to the homescreen
    export default Buysellrent;

  

    