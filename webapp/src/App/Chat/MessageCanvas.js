
import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Button, Stack } from 'react-bootstrap'
import './MessageCanvas.scss';
import Spinner from 'react-bootstrap/Spinner';
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../Store/actions/authActions";

//Chat element
function OffCanvasExample({ name, ...props })
{
    //setting controlled variables
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const [chatContent, setChatContent] = useState('');
    const [email, setEmail] = useState(props.auth.user.email);
    const options = [

        {
            name: 'Enable both scrolling & backdrop',
            scroll: true,
            backdrop: true,
        }
    ];
    //method for handling close event
    const handleClose = () => setShow(false);
    //method for handling show event
    const handleShow = () => setShow(true);
   
    ////method for handling message text box change
    const methodMsg = (e) =>
    {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    //method to send message to server
    const callSend = () =>
    {

        //console.log('message is:'+document.findElementByID('messageBox').value)
        console.log('email is:'+email)
        //POST request
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //updating the status to completed.
            body: JSON.stringify({
                description: value,
                sellerEmailId : email
            })
        };

        setChatContent(chatContent + "\n" + value)
        // alert('Sending your kind message to Admin')
        fetch('http://localhost:3001/messages', requestOptions)
            .then(res => res.json())
            .then(result =>
            {
                props.isLoaded = true
                props.items = result

            });

            
        //reset the message box value
        setValue('')
    }


    //return method
    return (
        // chat component
        <div className="chat-sticky">
            <Button variant="secondary" onClick={handleShow} className="me-2 chat-align">
                <Spinner animation="grow" /><div className="chat-height"><b className="chat-font-size">Chat Now</b></div>
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Chat with us</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    We are here to help, enter your message.

                    <hr />
                    So, How can we help you today?
                    <hr/>
                    {/* message div */}
                    <Stack direction="vertical" gap={3}>
                        <div className="messages-input">
                            <Stack direction="horizontal" gap={2}>
                                <label value="" >Message</label>
                                <input type="text"
                                    onChange={methodMsg}
                                    value={value} id="messageBox" placeholder="type here..." />
                            </Stack>
                        </div>
                        <div className="messages-input">
                            <Button onClick={callSend}
                                variant="secondary">
                                Send</Button>
                        </div>

                        <hr />
                        <label>{chatContent} </label>
                        {/* <label>{showDefaultMsg ? 'We will get back to you shortly.' : ''}</label> */}

                        <label>{'We will get back to you shortly.'}</label>
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

//chat component
function Example()
{
    
    return (
        <>
            {['Chat'].map((placement, idx) => (
                <OffCanvasExample key={idx}   {...placement} />
            ))}
        </>
    );
}


//export default Example;


//Redux settings for getting current user details if login user done
OffCanvasExample.propTypes = {
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
)((OffCanvasExample));