// SellerHome.js
import React from 'react';
import './SellerHome.scss';
import './AddPosting.scss';
import {  Link } from "react-router-dom";
import { Button, Row, Col, Stack, ListGroup, Card, Container } from 'react-bootstrap';
// import Spinner from 'react-bootstrap/Spinner'
import AddPosting from './AddPosting';
import Example from '../Chat/MessageCanvas';
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../Store/actions/authActions";
class SellerHome extends React.Component
{
    // constructor
    constructor(props)
    {
        super(props);
    }

    //function for Addlisting component call
    addListingPage()
    {
        <AddPosting />
    }

    //render method to display
    render()
    {
        console.log("this.props inside sellerhome", this.props.auth && this.props.auth.user);
        return (

            <div>
                <Container className="seller-center-content">
                    <div className="seller-spacing">
                    </div>
                    {/* <h4 className="col-md-2 mx-auto sellerWhiteColor">Seller home page</h4> col-md-7 mx-auto*/}
                    <h1 className=" sellerWhiteColor">Sell/Rent your home with confidence!</h1>
                    <div className="seller-spacing">
                    </div>
                    <div className="seller-spacing">
                    </div><div className="seller-spacing">
                    </div>
                    <Row>
                        <h3 className="col-md-7 mx-auto sellerWhiteColor">We are here to help you in selling our home easily with us. </h3>
                    </Row>
                    <div className="seller-spacing">

                    </div>
                    <Container className="seller-main-container-home" >

                        <Row>
                            <Col >
                                {/* sell home card */}
                                <Card className="seller-card-home seller-card-margin-left">
                                    <Card.Img variant="top" src="assets/sellerHomeSell.gif" />
                                    <Card.Body>
                                        <Card.Title className="seller-center">Sell your home </Card.Title>
                                        <Card.Text>
                                            Getting a competitive cash offer for your home is an easy path, with more control and less prepwork.
                                            You sell your home as-is by yourself.
                                            Deciding to sell your home yourself is referred to as for-sale-by-owner.
                                        </Card.Text>
                                        <div className="seller-center">
                                            <Link to="/addListing"> <Button className="seller-center" variant="secondary">Sell Now</Button></Link>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {/* Rent home card */}
                            <Col>
                                <Card className="seller-card-home seller-card-margin-right">
                                    <Card.Img variant="top" src="assets/sellerHomePage.gif" />
                                    <Card.Body >
                                        <Card.Title className="seller-center">Rent your home </Card.Title>
                                        <Card.Text>
                                            Wanna earn some extra cash when you are on vacation?
                                            Or you are owner of multiple properties? Get monthly rent for your extra room in home or invite guests over weekend when you are on vacation!
                                        </Card.Text>
                                        <div className="seller-center">
                                            <Link to="/addListing"><Button variant="secondary">Rent Coming Soon</Button></Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>


                    </Container>

                    <div className="seller-spacing">
                    </div>
                    {/* why sell yourself container */}
                    <Container className="col-md-4 mx-auto">

                        <Card className="seller-why-sell">
                            <Card.Header><b className="seller-font-color seller-center">Why sell Yourself?</b></Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Avoid paying a listing agent commission</ListGroup.Item>
                                <ListGroup.Item>Advertise your listing for free on our website</ListGroup.Item>
                                <ListGroup.Item>Flexibility and control from start to finish</ListGroup.Item>
                                <ListGroup.Item>

                                    <Stack direction="horizontal" gap={3}>
                                        <Link to="/addListing">
                                            <Button variant="secondary">
                                                Create a listing
                                            </Button> </Link>

                                        <Link to="/viewMyListing"><Button variant="secondary">View My Listings</Button></Link>
                                        <Link to="/viewTourBooking"><Button variant="secondary">View Tour Bookings</Button></Link>

                                    </Stack>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>

                    </Container>

                    <div className="seller-spacing-2">
                    </div>

                    <div className="seller-spacing-2">
                    </div>
                    <div className="seller-spacing-2">
                    </div>
                    <div className="seller-spacing-2">
                    </div>
                    <div className="seller-spacing-2">
                    </div>
                    <div className="seller-spacing-2">

                    </div>
                    <Col>

                        <div className="seller-spacing-2">
                        </div>



                        <div className="seller-spacing-2">
                        </div>

                        <div className="seller-spacing-2">


                        </div>


                    </Col>


                </Container>

                <div className="chat-sticky"><Example /></div>

            </div>


        );
    }
}

//Redux settings for getting current user details if login user done
SellerHome.propTypes = {
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
)((SellerHome));