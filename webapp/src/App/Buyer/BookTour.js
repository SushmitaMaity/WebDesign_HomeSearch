import React from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Form } from "react-bootstrap";
import "./BookTour.scss"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, logoutUser } from "../../Store/actions/authActions";


class BookTour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // getting the user email
            buyerID: JSON.parse((localStorage.getItem("loggedInUser"))).email,
            sellerID: this.props.cardInfo.sellerEmailId,
            houseID: this.props.cardInfo._id,
            houseName: this.props.cardInfo.name
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // method to handle the submit
    handleSubmit(event) {

        event.preventDefault();
        // checking if any field is empty
        if ((this.buyerEmail.value === "") || (this.buyerContact.value === "") || (this.datePickerRef.value === "")) {
            alert("All inputs are required")
        } else {
            // posting data to the database
            fetch('http://localhost:3001/bookings', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "buyerID": this.state.buyerID,
                    "buyerEmail": this.buyerEmail.value,
                    "buyerContact": this.buyerContact.value,
                    "houseID": this.state.houseID,
                    "houseName": this.state.houseName,
                    "sellerID": this.state.sellerID,
                    "date": this.datePickerRef.value,
                    "time": this.datePickerRef.value
                })
            })
            alert("Sent Booking Tour Request")
        }
    }
    render() {
        return (
            <div className="buyerForm">
                <Form >
                    <Form.Group className="mb-3" controlId="formDateandTime">
                        Choose a date and time:
                        <div class="datepicker">
                            <DateTimePickerComponent placeholder="Choose a date and time" ref={(ref) => { this.datePickerRef = ref }} ></DateTimePickerComponent>
                        </div>
                    </Form.Group>
                    How should we contact you?
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email" ref={(ref) => { this.buyerEmail = ref }} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Control type="number" placeholder="Phone" ref={(ref) => { this.buyerContact = ref }} />
                    </Form.Group>

                    <div class="datepickerButton">
                        <button className="buttonInfo" onClick={this.handleSubmit}>Book Tour</button>
                    </div>
                </Form>
            </div>
        );

    }
}

// for getting the user details through redux
BookTour.propTypes = {
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser, logoutUser }
)((BookTour));


