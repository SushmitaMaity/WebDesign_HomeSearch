

import React from 'react';
import './TourBookingItem.scss';
// import { Form, FormGroup, FloatingLabel, RangeSlider, InputGroup, FormControl } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";


//seller tour booking item indiviual
const TourBookingItem = (props) => {

    const card = props.displayitem;
    // const navigate = useNavigate();


    //method to update booking status - accept/reject
    const calUpdate = (e) => {
        alert("Updating booking");
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // updating the status to accepted.
            body: JSON.stringify({
                isAccepted: e.isAccepted ? false : true
            })
        };
        console.log('hi' + e);
        console.log(e);
        //sending a URL with ID attached so that the status of only that particular ID will get updated
        fetch(`http://localhost:3001/bookings/${e.id}`, requestOptions)
            .then(response => response.json())
            .then(() => {
                window.location.reload();
                console.log('ok');
                //props.reload = props.reload ? false : true;
            });


    }
    console.log('hi' + card);
    //return method
    return (

        <Card key={card.id} className="seller-tour-card-list-padding seller-card-img">
            <Card.Body>
                <Card.Title>{card.houseName}</Card.Title>
                <Card.Text>
                    Date: {card.date}
                </Card.Text>
                <Card.Text>
                    Time: {card.time}
                </Card.Text>

                <Card.Text>
                    Buyer Email: {card.buyerEmail}
                </Card.Text>
                <Card.Text>
                    Buyer Contact: {card.buyerContact}
                </Card.Text>
                <Card.Text>
                    Accepted: {card.isAccepted ? "Yes" : "No"}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button onClick={() => calUpdate(card)}>Accept/Reject</Button>
                {/* <Button onClick={this.acceptBtnHandle}>Reject</Button> */}
            </Card.Footer>
        </Card>

    );
    // }

}

export default TourBookingItem;

