import React from 'react';
import { Carousel } from "react-bootstrap";
import HotHomesChart from './HotHomesChart';
import "./Hothomesdisplay.scss";

//adding class hothomesdisplay
export class HotHomesdisplay extends React.Component {
  //adding constructor
  constructor(props) {
    super(props);
  };
  render() {
    return (
      //adding some houses img in carousel format
      <div>
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/1549585070420.jpeg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>Cambridge, Boston</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/ralph-kelly-z9fFOzL5L_Y-unsplash.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Pacific Heights, San Francisco</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/vu-anh-TiVPTYCG_3E-unsplash.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>West Seattle, Seattle</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* adding a row for all the exclusive hot homes information */}
        <div class="grid" className="hothomesdetails">
          <div class="column" className="exclusive">
            <img className="img1" src="assets/41476-search-document.gif" />
            <h4>Access Exclusive Information</h4>
            <p>See home-sale predictions you won't find anywhere else.</p>
          </div>
          <div class="column" className="Prioritize">
            <img className="img2" src="assets/59875-home.gif" />
            <h4>Prioritize Your Home Tours</h4>
            <p>Know which homes you should go see in person right away.</p>
          </div>
          <div class="column" className="Competitive">
            <img className="img3" src="assets/23573-home-refill-mainscreen-onboarding.gif" />
            <h4>Get a Competitive Advantage</h4>
            <p>Move faster and smarter to buy your dream home.</p>
          </div>
        </div>
        {/* importing hothomeschart here */}
        <HotHomesChart></HotHomesChart>
        <div>
          <p className="para2">Our HomesByASAP Hot Homes algorithm, which takes into account many factors that contribute to how quickly a home will sell. These factors include the home's liked count, price, property type, neighborhood, and sale history, as well as how quickly similar homes in that neighborhood tend to sell.</p>
        </div>
      </div>
    )
  }
}

export default HotHomesdisplay;

