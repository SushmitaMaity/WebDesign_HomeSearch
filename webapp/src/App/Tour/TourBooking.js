import React from 'react';
import './TourBooking.scss';
import TourBookingItem from './TourBookingItem';
import { Alert, Container, CloseButton } from 'react-bootstrap'
import { Link } from "react-router-dom";

//Seller tour bookings
export class TourBooking extends React.Component {

    //constructor initialise
    constructor(props) {

        super(props);
        // state variable defined
        this.state = {
            items: [],
            isLoaded: false,
            refreshing: true,
            seen: false,
            varItem: [],
            loca: JSON.parse(localStorage.getItem('loggedInUser')),
        };
        //bind method
        this.acceptBtnHandle = this.acceptBtnHandle.bind(this);

    }

    //method to render each tour bookings
    renderCard = (item, index) => {
        return (
            <>
                {/* calling tour booking component */}
                <TourBookingItem displayitem={item}
                //reload={this.state.refreshing}
                />

            </>
        );
    }
    //method called when loaded
    componentDidMount() {
        console.log('compnet mount' + this.state.loca.email)
        fetch('http://localhost:3001/bookings')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            });

        //console.log('email:'+this.props.auth.user.email)
        console.log('compnet mount' + this.state.loca.email)
    }

    //accept btn will change accept state to ok accepting
    acceptBtnHandle() {
        console.log('handler code');
    }

    //main render method
    render() {
        //const loca = JSON.parse(localStorage.getItem('loggedInUser'));
        // getting all current items
        const { items } = this.state;
        console.log(items)
        return (
            // main container
            <Container >
                {/* Alert heading */}
                <Alert variant="primary">
                    <Link to="/sellerHome"><CloseButton variant="black" /></Link>
                    <hr />
                    <h1> Tour Bookings for your property!</h1>
                    <hr />
                    Click to accept or reject requests
                    <hr />
                </Alert>
                {/* book tour entry ->  buyerid, buyeremail, buyerphone, houseid, date,time, 
                  sellerid, isAccepted  <- post to database */}

                {/* main container for tour booking */}
                <div className="seller-tour-card-main-wrapper">
                    {/* call render each tour booking item */}
                    {items.filter(name => name.sellerID === this.state.loca.email).map(this.renderCard)}
                    {/* {items.map(this.renderCard)} */}
                </div>
            </Container>
        );
    }


}

//Redux settings for getting current user details if login user done
// TourBooking.propTypes = {
//     loginUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
//   };
//   const mapStateToProps = state => ({
//     auth: state.auth,
//     errors: state.errors
//   });

//   export default connect(
//     mapStateToProps,
//     { loginUser }
//   )((TourBooking));