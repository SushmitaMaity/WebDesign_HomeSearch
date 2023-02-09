
import React from 'react';
import './HouseDetails.scss';
// import { Form, FormGroup, FloatingLabel, RangeSlider, InputGroup, FormControl } from 'react-bootstrap';
import { Card, Row, Badge, Col,  Button } from 'react-bootstrap'
// import { HouseListings } from './HouseListings';
import ImageSlider from './ImageSlider';
import { useNavigate } from "react-router-dom";
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../Store/actions/authActions";

//main function HouseDetails display each listing
const HouseDetails = (props) =>
{

    const card = props.displayitem;
    const navigate = useNavigate();
    const navigateClick = (card) =>
    {
        // console.log(card);
        navigate('/UpdateHouse', {
            state: {
                getCard: card,
            }
        });
    };

    //function to handle delete
    const calDelete = (e) =>
    {
        alert("Deleting the listing");
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
            //updating the status to completed.
            //   body: JSON.stringify({          
            //   status: 'Completed' })
        };
        console.log('hi' + e);
        console.log(e);
        //sending a URL with ID attached so that the status of only that particular ID will get updated
        fetch(`http://localhost:3001/houses/${e.id}`, requestOptions)
            .then(response => response.json())
            .then(() =>
            {
                window.location.reload();
            });


    }
    console.log('hi' + card);

    // if(card.sellerEmailId === props.auth.user.email)
    // {
    //     console.log('card.sellerEmailId'+card.sellerEmailId);
    //     console.log('props.auth.user.email'+props.auth.user.email);
    // }
    
    //return method
    return (
        <Card key={card.id} className="seller-card-list-padding seller-card-img">
            {/* <Card.Img variant="top" src={card.pics} />  */}

            <ImageSlider picsArray={card.pics} />
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{card.name}</Card.Title>
                    </Col>
                    <Col>
                        <Card.Text className="seller-float-right">
                            <Badge bg="primary" >Beds:{card.beds}</Badge>
                            <b> </b>
                            <Badge bg="primary" >Baths:{card.baths}</Badge>
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Card.Text >
                        <Badge bg="primary">Address:</Badge>
                        <div > {card.streetAddress}, {card.unit}, {card.city}, {card.states}, {card.zipcode}
                        </div>
                    </Card.Text>
                </Row>
                <Row>
                    <Col>
                        <Card.Text>
                            <Badge bg="primary" className="seller-float-left">Home type: </Badge><b> </b> {card.homeType}
                        </Card.Text>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <Card.Text>
                            <Badge bg="primary" className="seller-float-left">Square Feet: {card.squareFeet}</Badge>
                        </Card.Text>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Card.Text>
                            <Badge bg="primary" className="seller-float-left">HOA:</Badge> {card.hoa}

                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text className="seller-float-right">
                            <Badge bg="primary">Built Year: </Badge> {card.year}
                        </Card.Text>
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Card.Text>
                        <Badge bg="primary" className="seller-float-left">Contact:</Badge>
                        {card.phonenumber}
                    </Card.Text>
                </Row>
                <Row>
                    <Card.Text>
                        <Badge bg="primary" className="seller-float-left">Description:</Badge>
                        {card.description}
                    </Card.Text>
                </Row>
                <Card.Text>
                    <Badge bg="primary" className="seller-float-left">Price:</Badge>
                    <small className="text-muted">${card.price}</small>
                </Card.Text>
            </Card.Body>
            <Card.Footer>

                <Button variant="secondary"
                    name={card.id}
                    onClick={() => navigateClick(card)}>Update</Button>
                {/* {this.state.seen ? <HouseListings seen={this.state.seen} card={card} /> : null}
                    <PopUp/> */}
                <Button variant="secondary" className="seller-float-right" name={card.id} onClick={() => calDelete(card)}>Delete</Button>
            </Card.Footer>
        </Card>

    );
 }

// }

//Redux settings for getting current user details if login user done
HouseDetails.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { loginUser }
  )((HouseDetails));