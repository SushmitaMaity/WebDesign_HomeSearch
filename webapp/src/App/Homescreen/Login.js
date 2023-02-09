import React, { Component } from 'react';
import Modal from 'react-modal';
import { Button, Form } from 'react-bootstrap';
import './Login.scss';
// import store from '../../Store/store';
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { loginUser } from "../../Store/actions/authActions";
const customStyles = {
  content: {
    top: '25%',
    left: '40%',
    bottom: '20%',
    right: '40%',
    background: 'black'
  
  },
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    //required fields to login 
    this.state = {
      email: "",
      password: "",
      errors: {},
      checkRole: false
    }
    // this.reload = this.reload.bind(this);
  }

  handleEmail = e => {
    this.setState({ email: e.target.value });
  }
  handlePassword = e => {
    this.setState({ password: e.target.value });
  }
  //Onchange handler to set the values input by the user
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // reload = () => window.location.reload();

  //on Submit is the handler when user tries to  click on login button 
  //it stores the state of the login user

   validateEmail=(email) =>
    {
      // myname@domain.domain format style of validation
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  
  validatePassword = (password) => {
    // Uppercase, lowercase , digits and between 6 to 20 char length
    var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return regexPassword.test(password);
  }

   onSubmit =() => {
 
      const userData = {
        email: this.state.email,
        password: this.state.password,
      }
      console.log("inside submit in login", userData);
      // this.props.loginUser(userData);
      this.props.onLogin(userData);
    // }
    
    // 2 debugger

    // this.reload();
  }
  // DOM tree to be rendered 
  render() {
    const { errors } = this.state;
    return (
      //here root element of the tree is section 
      <Modal
        isOpen={this.props.showlogin}
        // onCloseModal={props.displayLoginPopup(false)}
        style={customStyles}>
        <label className="login">Login</label>
        <div className="cross" onClick={() => this.props.displayLoginPopup(false)}><h5>X</h5></div>
        <Form>
          <Form.Group className="login1" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control className="email" type="email" placeholder="Enter Email" onChange={(e) => this.handleEmail(e)} />
            {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
          </Form.Group>
          <br />
          <Form.Group className="login2" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control className="password" type="password" placeholder="Password" onChange={(e) => this.handlePassword(e)} />
          </Form.Group>
<br/>
          {/* <Form.FloatingLabel>Forgot Password</Form.FloatingLabel> */}
          <Button className="button" variant="primary" type="submit" onClick={() => this.onSubmit()} >
            Submit
          </Button>
        </Form>
        {/* <button
        className="uk-button uk-button-danger uk-button-small"
        onClick={() => this.props.displayLoginPopup(false)}>
        Close
      </button> */}
      </Modal>
    )
  }
}
