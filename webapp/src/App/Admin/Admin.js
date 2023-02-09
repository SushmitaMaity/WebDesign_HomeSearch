import React from 'react';
import { Card, Carousel } from "react-bootstrap";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMessages } from "../../Store/actions/messageActions";
import { getContacts } from "../../Store/actions/contactActions";
import { getAllUsers } from "../../Store/actions/adminActions";
import './Admin.scss';

// Admin class : 1. Shows Dashboard with contact reequests and messages
//               2. Shows All users
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  // Fetching messages and contacts from users using redux actions
  componentDidMount() {
    this.props.getMessages();
    this.props.getContacts();
  }

  render() {
    return (
      <>
        <div className='adminListingbody'>
          <h4>Contact - Us Messages:</h4><br />
          <div className='adminListingdivide'>
  {/* Displaying User contact messages by accessing the redux state */}
            {
              this.props.contacts.contacts.length > 0 ? this.props.contacts.contacts.map((contact) => {
                return (
                  <div>
                    <Card className="adminContactus">
                      <Card.Body>
                        <Card.Title>{contact.name}</Card.Title>
                        <Card.Text>
                          {contact.message}
                        </Card.Text>
                        <footer className="">
                          Email: {contact.email} <br />
                          Contact: {contact.contact}
                        </footer>

                      </Card.Body>
                    </Card> </div>);
              }) : null
            }
          </div> <br />
          <br/><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          {/* Displaying User messages by accessing the redux state */}
          <div className='adminListingbox2'>
            <h4 className="adminMessageText">Chat Messages:</h4><br />
            <div className="adminCarousel">
{/* Using react-bootstrap for Carousel and Card */}
              <Carousel className="adminMessages">
                {
                  this.props.messages.messages.length > 0 ? this.props.messages.messages.map((message) => {
                    console.log("message", message);
                    return (
                      <Carousel.Item interval={5000}>
                        <Card className="adminMessagesCard">
                          <Card.Body>
                            <Card.Title>{message.sellerEmailId}</Card.Title>
                            <Card.Text>
                              {message.description}
                            </Card.Text>


                          </Card.Body>
                        </Card>

                      </Carousel.Item>);
                  }) : null
                }

              </Carousel>
            </div>




          </div>
        </div>
      </>
    );
  }
};
// Connecting with redux store to access actions and reducer states
Admin.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  //loginUser: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  admin: state.admin,
  messages: state.messages,
  contacts: state.contacts
});

export default connect(
  mapStateToProps,
  { getAllUsers, getMessages, getContacts }
)((Admin));