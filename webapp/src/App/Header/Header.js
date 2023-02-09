import React from 'react';
import './Header.scss';
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, logoutUser } from "../../Store/actions/authActions";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Login from "../Homescreen/Login";
import Signup from "../Homescreen/Signup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkUser: false,
            checkGeneral: false,
            checkAdmin: false,
            showlogin: false,
            showsignup: false,
            checklogin: false
        };
        this.userNav = this.userNav.bind(this);
        this.adminNav = this.adminNav.bind(this);
        this.generalNav = this.generalNav.bind(this);

    }
    // Shows login pop up by setting boolean flag
    displayLoginPopup = (param) => {
        this.setState({ showlogin: param });
    };
    // Shows signin pop up by setting boolean flag
    showSignupPopup = (param) => {
        this.setState({ showsignup: param });
    }
    // Login method: 1. Closes login pop up by setting boolean flag
    //               2. Calls redux login action which sets localstorage 
    onLogin = (userData) => {
        this.displayLoginPopup(false);
        this.props.loginUser(userData);
    }
    // Logout method : 1. Calls redux action to log out user which clears localstorage
    //                 2. Sets General navigation, which consists of navigation without any user login
    onLogout = () => {
        this.props.logoutUser();
        this.checkGeneral();
    }
    // Alerts user to login to access buy/sell
    handleError = () => {
        toast.info("Please login to view buy or sell pages!");
    }
    // General Navigation, when no user is logged in
    generalNav() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/AboutUs">About</Nav.Link>
                            <Nav.Link eventKey={2} onClick={() => this.handleError()}>Buy</Nav.Link>
                            <Nav.Link eventKey={2} onClick={() => this.handleError()}>Sell</Nav.Link>
                        </Nav>
                        <Nav>
                            {localStorage.getItem("loggedInUser") ?
                             <Link to="/">
                                <button
                                    className="signout"
                                    onClick={() => this.onLogout()}
                                >
                                    Sign out
                                </button> </Link>: null}
                                <>
                            <Nav.Link eventKey={2} onClick={() => this.showSignupPopup(true)}>
                                Sign Up
                            </Nav.Link>
                            {this.state.showsignup ? (
                                <Signup
                                    showSignupPopup={this.showSignupPopup}
                                    showsignup={this.state.showsignup}
                                ></Signup>
                            ) : null}
                            <Nav.Link eventKey={2} onClick={() => this.displayLoginPopup(true)}>
                                Log In
                            </Nav.Link>
                            {this.state.showlogin ? (
                                <Login
                                    displayLoginPopup={this.displayLoginPopup}
                                    showlogin={this.state.showlogin}
                                    onLogin={this.onLogin}
                                ></Login>
                            ) : null}
                            </>

                            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    // Logged in user's navigation
    userNav() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" >
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            {/* <Nav.Link href="/sellerHome">Sellers Home</Nav.Link> */}
                            <Nav.Link href="/AboutUs">About</Nav.Link>
                            <NavDropdown title="Sell" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/sellerHome">Seller Home</NavDropdown.Item>
                                <NavDropdown.Item href="/addListing">Add Listing</NavDropdown.Item>
                                <NavDropdown.Item href="/viewMyListing">View my Listing</NavDropdown.Item>
                                <NavDropdown.Item href="/viewTourBooking">Tour Bookings</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Buy" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/buyerViewListing">View all Listings</NavDropdown.Item>
                                <NavDropdown.Item href="/AdvancedSearch">Advanced Search</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
                            {/* <Nav.Link eventKey={2} href="#memes">
                                Log Out
                            </Nav.Link> */}
                           {localStorage.getItem("loggedInUser") ?
                           <Link to="/">
                                <button
                                    className="signout"
                                    onClick={() => this.onLogout()}
                                >
                                    Sign out
                                </button>  </Link>: null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
    // Admin's navigation
    adminNav() {

       const loca = JSON.parse((localStorage.getItem("loggedInUser")));
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Container>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/AboutUs">About</Nav.Link>
                            <Nav.Link href="/admin">Dashboard</Nav.Link>
                            <Nav.Link href="/users">Users</Nav.Link>
                        </Nav>
                        <Nav>

                            {loca && loca.role == "admin" ? <button
                                className="signout"
                                onClick={() => this.onLogout()}
                            >
                                Sign out
                            </button> : null}
                            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
    // Setting user and admin boolean flags depending on current user role
    componentDidMount() {

        const loca = JSON.parse((localStorage.getItem("loggedInUser")));

        if (loca && loca.role === "user") {
            this.setState({ checkUser: true,
                checkAdmin: false,
                checkGeneral: false
            });
        }

        if (loca && loca.role === "admin") {
            this.setState({ checkAdmin: true,
                checkUser: false ,
                checkGeneral: false
             })
        }

    }
    // Sets Admin flag true
    checkAdmin = () => {
        this.setState({ checkAdmin: true,
            checkUser: false,
            checkGeneral: false 
         });
    }
    // Sets User flag true
    checkUser = () => {
        this.setState({ checkUser: true,
            checkAdmin: false,
            checkGeneral: false });

    }
    // Sets no user logged in flag true
    checkGeneral = () => {
        this.setState({ checkGeneral: true,
            checkUser: false,
            checkAdmin: false  });
    }

    componentDidUpdate(prevState, prevProps) {
        let ad = this.props.auth.user.role;
        const loca = JSON.parse((localStorage.getItem("loggedInUser")));
        
        if(this.props.auth.user.role == "admin" && !this.state.checkAdmin)
          {
            this.checkAdmin()
        }

        else if ((this.props.auth.user.role === "user") && (this.state.checkUser !== true)) {
            this.checkUser()
        }
    }

    render() {

        const loca = JSON.parse((localStorage.getItem("loggedInUser")));

        return (

            <div>
                <ToastContainer autoClose={4000} />
                <nav className="headerBody" alight="left">
                    <div>
                        <a href="/">
                            < img alt="HOMeby.png" src="assets/HOMeby.png" className="homesc-logo" />
                        </a>
                    </div>

                    <div className="navBar">
                        {loca ? <h6 className="navText">Hi {loca.name}</h6> : null}
                        {this.state.checkAdmin ? this.adminNav() : this.state.checkUser ? this.userNav() : this.generalNav()
                        }
                        {/* this.props.auth.user.role */}

                    </div>
                </nav>

            </div>


        );
    }
}
// Connecting with redux store to access actions and reducer states
Header.propTypes = {
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    //loginSuccess: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser, logoutUser }
)((Header));