import React from 'react';
import Modal from 'react-modal';
import {Button, Form, DropdownButton, Dropdown} from 'react-bootstrap';
// import { Link,withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "../../Store/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './Signup.scss';

const customStyles = {
  content: {
    top: '25%',
    left: '40%',
    bottom: '20%',
    right: '40%',
    background: 'black'
 
  },
};
class Signup extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      
    //adding properties to the assigned name 
    name: this.props.userName,
    email: this.props.userEmail,
    password: this.props.userPassword,
    role: this.props.userRole,
     
    };
//handling the value
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }
  //value assigned to the input
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleEmailChange(e) {
    // console.log("email", e.target.value);
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleRoleChange(e) {
    console.log("role", e.target.outerText);
    this.setState({role: "user"});
  }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }
//handles the input by the user and update them using the setState
  handleInputChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };
//Once we cilck on submit button we store the user details using registerUser
validateEmail=(email) =>
{
  // myname@domain.domain format style of validation
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
validateName=(name) =>
{
  // myname@domain.domain format style of validation
  var re = /^[a-zA-Z]$/;
  return re.test(name);
}
validatePassword = (password) => {
// Uppercase, lowercase , digits and between 6 to 20 char length
var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
return regexPassword.test(password);
}

  handleSubmit = (e) => {
    //  e.preventDefault();
    let emailValidated = this.validateEmail(this.state.email);
    let passwordValidated = this.validatePassword(this.state.password);
    let nameValidated = this.validateName(this.state.name);
    if(emailValidated && passwordValidated ){
      // && nameValidated
      const newUser = {
        name : this.state.name,
        email : this.state.email,
        password :this.state.password,
        role:"user"
     };
    
     this.props.signupUser(newUser, this.props.history); 
     toast.info("Signed Up successfully");
    }else {
      toast.warn("Please enter valid details");
    }
      
};
    render() {  
  console.log("this.props in signup", this.props);
return (

  <Modal
   isOpen={this.props.showsignup}
    style={customStyles}>
        <label className="signup">Sign up</label>
        <div className="cross1" onClick={() => this.props.showSignupPopup(false)}><h5>X</h5></div>

        <Form onSubmit={this.handleSubmit}>
        {/* <Button className="button" variant="primary" type="Seller">Seller</Button>
        <Button className="button" variant="primary" type="Buyer">Buyer</Button> */}
        {/* <div class="dropdown"> 
 
 <DropdownButton id="dropdown-basic-button" title="Role" > 
 <Dropdown.Item href="#/action-1"onClick={(e) => this.handleRoleChange(e)}>Seller</Dropdown.Item>
  <Dropdown.Item href="#/action-2" onClick={(e) => this.handleRoleChange(e)}>Buyer</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> 
</DropdownButton>
</div> */}
        
  <Form.Group className="signup1" controlId="formBasicName">
    {/* <Form.Label>Email address</Form.Label> */}
     <Form.Control className="name" type="name" placeholder="Enter Name" id="newNameNode" 
     onChange={(e) => this.handleNameChange(e)} />
  </Form.Group>
  <br/>
   <Form.Group className="signup1" controlId="formBasicemail">
    {/* <Form.Label>Email address</Form.Label> */}
    <Form.Control className="email" type="email" placeholder="Enter Email" id="newEmailNode" 
    // inputRef={(node)=>{this.inputRef = node;}}
    onChange={(e) => this.handleEmailChange(e)}/>
  </Form.Group>
<br/>
  <Form.Group className="signup2" controlId="formBasicpassword">
    {/* <Form.Label>Password</Form.Label> */}
    <Form.Control className="password" type="password" placeholder="Enter Password" id="newPasswordNode" 
    onChange={(e) => this.handlePasswordChange(e)}/>
  </Form.Group>
  
 {/* <Form.FloatingLabel>Forgot Password</Form.FloatingLabel>  */}
 <br/>
  <Button className="button" variant="primary" type="submit" onChange={() => this.handleSubmit()}>
    Submit
  </Button>
</Form>
{/* <button
        className="uk-button uk-button-danger uk-button-small"
        onClick={() => this.props.showSignupPopup(false)}>
        Close
      </button> */}
    </Modal>
);
}
}
Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
// Allows us to get our state from redux and map it to props 
// and can be used inside our component
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signupUser }
)((Signup));
