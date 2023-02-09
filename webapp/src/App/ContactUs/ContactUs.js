import React from 'react';
import './ContactUs.scss';

export class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: false,
      contact: '',
      email: '',
      emailError: false,
      emailError2: false,
      message: '',
      messageError: false,
      formValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

//   for the email validation
  isValidEmail(email) {
    var check = /^\S+@\S+\.\S+$/;
    return check.test(email);
  }

//   method to handle form value change
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

//   method to handle submit of the form
  handleSubmit(e) {
    const {
      name,
      email,
      message,
      nameError,
      emailError,
      emailError2,
      messageError,
    } = this.state;

    // for the sending email part
    const templateId = 'template_sydlcu9';

    // specified the variables to be changed in the email
    this.sendFeedback(templateId, {
      message: this.state.message,
      toname: this.state.name,
      toemail: this.state.email,
    });

    this.setState({ nameError: name ? false : true });
    this.setState({ messageError: message ? false : true });
    this.setState({ emailError: email ? false : true });
    if (email && !emailError) {
      this.setState({ emailError2: this.isValidEmail(email) ? false : true });
    }

    // checking validations
    if (
      name &&
      email &&
      message &&
      !nameError &&
      !emailError &&
      !emailError2 &&
      !messageError
    ) {
      this.setState({ formValid: true });

    //   posting the data to the database
      fetch('http://localhost:3001/contactus', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          contact: this.state.contact,
          message: this.state.message,
        }),
      });
    } else {
      this.setState({ formValid: false });
    }

    e.preventDefault();
  }

//   method to send the email
  sendFeedback(templateId, variables) {
    window.emailjs
      .send('service_c2et0i8', templateId, variables)
      .then((res) => {
        console.log('Email successfully sent!');
      })
      // Handlling error
      .catch((err) =>
        console.error('Oh well, you failed. Here some thoughts on the error that occured:',err)
      );
  }

  render() {
    const {
      name,
      email,
      message,
      nameError,
      emailError,
      emailError2,
      messageError,
      formValid,
    } = this.state;

    if (!formValid) {
      return (
        <>
          <div className='card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light'>
            <h1 className='contactUsTitle'>Contact Us</h1>
            <div className='card-header bg-transparent border-0 text-center text-uppercase'>
              <h3>{this.props.title}</h3>
            </div>
            <div className='card-body'>
              <form
                action='/'
                onSubmit={(e) => this.handleSubmit(e)}
                encType='multipart/form-data'
                autoComplete='off'
              >
                <div className='form-group'>
                  <label className='mb-0'>
                    Name<span className='text-danger'>*</span>
                  </label>
                  <input
                    name='name'
                    type='text'
                    className='form-control'
                    placeholder='Name'
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  {/* checking validation */}
                  {nameError ? (
                    <div className='alert alert-danger mt-2'>
                      Name is a required field.
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <br />
                <div className='form-group'>
                  <label className='mb-0'>
                    Email<span className='text-danger'>*</span>
                  </label>
                  <input
                    name='email'
                    type='email'
                    className='form-control'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {/* checking validation */}
                  {emailError ? (
                    <div className='alert alert-danger mt-2'>
                      Email is a required field.
                    </div>
                  ) : (
                    ''
                  )}
                  {/* checking validation */}
                  {emailError2 ? (
                    <div className='alert alert-danger mt-2'>
                      Email invalid.
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <br />
                <div className='form-group'>
                  <label className='mb-0'>Contact Number (Optional)</label>
                  <input
                    name='contact'
                    type='text'
                    className='form-control'
                    placeholder='Contact'
                    onChange={this.handleChange}
                    value={this.state.contact}
                  />
                </div>
                <br />
                <div className='form-group'>
                  <label className='mb-0'>
                    Message<span className='text-danger'>*</span>
                  </label>
                  <textarea
                    name='message'
                    type='text'
                    className='form-control'
                    placeholder='Message'
                    value={this.state.message}
                    onChange={this.handleChange}
                  />
                  {/* checking validation */}
                  {messageError ? (
                    <div className='alert alert-danger mt-2'>
                      Message is a required field.
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <br />
                <p className='text-center mb-0'>
                  <input
                    type='submit'
                    className='btn btn-primary btn-lg w-100 text-uppercase'
                    value='Submit Now'
                  />
                </p>
              </form>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className='thankyou_details'>
          <div className='alert alert-success mt-3'>
            Mail sent successfully.
          </div>
        </div>
      );
    }
  }
}
