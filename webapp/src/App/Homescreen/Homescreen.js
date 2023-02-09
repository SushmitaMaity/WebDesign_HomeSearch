import React from "react";
import  SearchBar  from "../SearchBar/SearchBar";
import "./Homescreen.scss";
import { Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Buysellrent from "./Buysellrent";
import { Hothomes } from "./Hothomes";
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../Store/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';


//Adding constructor

class Homescreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showlogin: false,
      showsignup: false,
    };
  }
  //setting the login popup
  displayLoginPopup = (param) => {
    this.setState({ showlogin: param });
  };
  //setting the signup popup
  showSignupPopup = (param) => {
    this.setState({ showsignup: param });
  }
  //setting according to the data
  onLogin = (userData) => {
    this.displayLoginPopup(false);
    this.props.loginUser(userData);
  }
  render() {

    return (
      <div>
        <ToastContainer autoClose={4000} />
        <img alt="Background" src="assets/Flokk_Teams-Zoom-Background_Home_04.jpg" className="search-background-img"></img>
        <SearchBar></SearchBar>
        <div className="buysellrent"><Buysellrent>
        </Buysellrent></div>
        <Hothomes/>
      </div>
    );
  }
}
//authentication login
Homescreen.propTypes = {
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
)((Homescreen));