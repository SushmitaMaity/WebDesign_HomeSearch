// AddPosting.js
import React from 'react';
import './AddPosting.scss';
import { Form, Button, Row, Col, FormGroup, FloatingLabel, RangeSlider, InputGroup, FormControl, Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import Stack from 'react-bootstrap/Stack'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Route, Link } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';
import Alert from 'react-bootstrap/Alert'
import Geocode from "react-geocode";
import ProgressBar from 'react-bootstrap/ProgressBar';
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../Store/actions/authActions";
//import GoogleAutoComplete from 'react-google-autocomplete-address-fields';
import SearchLocationInput from './SearchLocationInput'
// component to create a house posting
class AddPosting extends React.Component {

    //constructor
    constructor(props) {
        super(props)

        //setting state
        this.state = {

            //needed for file upload
            selectedFile: null,
            loaded: 0,
            piclist: [],
            show: false,
            latitude: 0,
            longitude: 0,
        }//state ends       


        // RegEx for phone number validation
        const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

        // Schema for yup
        this.validationSchema = Yup.object().shape({
            streetAddress: Yup.string()
                .min(2, "*Street Address must have at least 2 characters")
                .max(100, "*Street Address can't be longer than 100 characters")
                .required("*Street Address is required"),
            unit: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(1, "*Unit must have at least 1 number")
                .max(5, "*Unit can't be longer than 5 characters")
                .required("*Unit is required"),
            city: Yup.string()
                .min(3, "*City must have at least 3 characters")
                .max(100, "*City must be less than 100 characters"),
            // .required("*City is required"),
            states: Yup.string()
                .required("*State is required"),
            zipcode: Yup.string()
                .required()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(5, 'Zipcode must be exactly 5 digits')
                .max(5, 'Zipcode must be exactly 5 digits'),
            name: Yup.string()
                .required("*Name is required")
                .min(5, "*Name must have 5 characters")
                .max(100, "*Name limit 100 characters"),
            price: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .required("*Price is required"),
            file: Yup.string(),
            // .required("*Pictures is required"),
            pics: Yup.array(),
            phonenumber: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .required("*Phone number is required")
                .min(10, "*Phone number must have 10 digits")
                .max(10, "*Phone number must have 10 digits"),
            description: Yup.string()
                .required("*Description is required")
                .min(5, "*Description must have 5 characters")
                .max(100, "*Description limit 100 characters"),
            beds: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .required("*Beds is required"),
            baths: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .required("*Baths is required"),
            squareFeet: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .required("*Finished Square Feet is required"),
            year: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .required("*Year is required")
                .min(4, "*Year must have 4 digits")
                .max(4, "*Year must have 4 digits"),
            lat: Yup.number(),
            lng: Yup.number(),
            homeType: Yup.string()
                .required("*Home Type is required"),
            sellerEmailId: Yup.string(),

        });


        this.handleInput = this.handleInput.bind(this);

        // for getting the latitude and longitude from the address
        this.latlang = this.latlang.bind(this);

        //autocomplete method binding
        this.callbackFunc = this.callbackFunc.bind(this);
    }//constructor ends


    // to get the latitude and longitude
    latlang = (values) => {
        Geocode.setApiKey("AIzaSyBK-xckagY7ua5F0qsjtzDVnxL0-63BquU");
        Geocode.setLanguage("en");
        Geocode.setRegion("us");
        Geocode.setLocationType("ROOFTOP");
        Geocode.enableDebug();

        const city = document.getElementById("cityState").value
        console.log("address" + values.streetAddress);
        console.log("city" + city);
        Geocode.fromAddress(values.streetAddress + " " + city).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({ latitude: lat, longitude: lng })
                console.log(lat);
                console.log(lng);
                console.log(this.state.latitude);
                console.log(this.state.longitude);
            },
            (error) => {
                console.error(error);
            }
        );
    }


    //autocomplete method
    callbackFunc = (autoCompleteData) => {
        //You can use the address data, passed by autocomplete as you want.
        console.log('in autocomplete callbackFunc')
    }

    //when components mount
    componentDidMount() {
        // this.validationSchema.sellerEmailId = this.props.auth.user.email;
        // console.log('this.props.auth.user.email: ', this.props.auth.user.email);
        const loca2 =  JSON.parse(localStorage.getItem('loggedInUser'));//this.state.loca.email;
        this.validationSchema.sellerEmailId = loca2.email;
        console.log('this.validationSchema.sellerEmailId : ', this.validationSchema.sellerEmailId );
    }

    //On updating the component this method is invoked   
    componentDidUpdate() {
        // console.log(this.props.auth)
        // if (Object.keys(this.props.auth.user).length === 0) {
        //     window.location.href = "/"
        // }
    }

    //On submit this method is called

    callHandleSubmit(values) {


        const loca = JSON.parse(localStorage.getItem('loggedInUser'));
        

        // setting the lat and lng in values
        values.lat = this.state.latitude;
        values.lng = this.state.longitude;

        console.log('inside submit checking email seller of')
        values.sellerEmailId = loca.email;//this.props.auth.user.email;
        console.log(values.sellerEmailId)
        //values.sellerEmailId = this.validationSchema.sellerEmailId;
       // console.log(values.sellerEmailId)
        const requestOptions = {
            method: "POST",
            // sending the above defined payload as body in Post request
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        };
        fetch("http://localhost:3001/houses", requestOptions)
            .then((response) => response.json())
            .catch((err) => console.log(err));

        //display suuccss
        alert("Posting successfully posted!");

    }

    //on change event of file chosen this method is called
    onChangeHandler = event => {
        // console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files,//[0],
            loaded: 0,
        })

    }

    //on change event of file upload this method is called
    onClickHandler = () => {
        const data = new FormData()
        //data.append('file', this.state.selectedFile)
        //var piclist = [];
        if (this.state.selectedFile === null) {
            console.log('no file is selected')
            return
        }

        //getting all files that are uploaded
        var len = this.state.piclist.length;
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
            //this.pics.append(this.state.selectedFile[x].name)
            console.log(this.state.selectedFile[x].name);
            this.state.piclist[len] = this.state.selectedFile[x].name;
            len++;
        }


        console.log(this.state.piclist)
        //add fecth api call

        fetch("http://localhost:3001/pics",
            {
                method: 'POST', body: data
            })
            .then((response) => response.json())
            .then(json => console.log(json))
            .then(console.log('okay'))
            // .then(console.log(req.files))
            .then(this.setState({
                loaded: 100

            }))
            .catch((err) => console.log(err));
    }



    //autocomplete address method
    handleInput = event => {

        const { value } = event.target;
        // setCity(value.city)
        // setState(value.state)
        // onLocation(value)
        console.log("map:" + value)
    };

    //render method
    render() {
        console.log("this.props inside add posting", this.props.auth && this.props.auth.user);
        console.log(this.props.auth.user.name)
        console.log(this.props.auth.user.email)
        console.log(this.props.auth.user.id)
        console.log(this.props.auth.user.name)
        console.log(this.state.sellerEmailId)
        return (
            <Container className="sellerWhiteColor">
                <div>
                    <Formik
                        initialValues={{
                            streetAddress: '', unit: '', city: '', states: 'Choose...', zipcode: '',
                            price: '', file: '', phonenumber: '', pics: '',
                            homeType: 'Choose...', hoa: '',
                            squareFeet: '', year: '',
                            beds: '', baths: '', description: '', name: '', sellerEmailId: this.props.auth.user.email
                        }}
                        // Hooks up our validationSchema to Formik 
                        validationSchema={this.validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            // When button submits form and form is in the process of submitting, submit button is disabled
                            setSubmitting(true);
                            // setting lat and longitude

                            console.log('on subnit click : ' + this.state.piclist);
                            values.pics = this.state.piclist;
                            values.file = this.state.piclist;
                            values.city = document.getElementById("cityState").value;
                            console.log('city: ' + values.city);
                            // submitting to database, shows us values submitted, resets form
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                resetForm();
                                setSubmitting(false);

                                this.callHandleSubmit(values);

                            }, 500);
                            this.setState({
                                loaded: 0
                            })
                        }}
                    >
                        {/* Callback function containing Formik state and helpers that handle common form actions */}
                        {({ values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>

                                {/*Heading alert */}
                                <Alert variant="primary">
                                    <Link to="/sellerHome"><CloseButton variant="black" /></Link>
                                    <hr />
                                    <h1> Tell us some details about your amazing property!</h1>
                                    <hr />
                                    Let's begin...
                                    <hr />
                                </Alert>
                                {/* Main form starts */}
                                <FormGroup>
                                    <Stack gap={4}>
                                        <Row>
                                            <Col>
                                                <Form.Control name="streetAddress" placeholder="Street Address"
                                                    /* Set onChange to handleChange */
                                                    onChange={handleChange}
                                                    /* Set onBlur to handleBlur */
                                                    onBlur={handleBlur}
                                                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                    value={values.streetAddress} /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                                                    className={touched.streetAddress && errors.streetAddress ? "error" : null}
                                                />
                                                {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                                                {touched.streetAddress && errors.streetAddress ? (
                                                    <div className="error-message">{errors.streetAddress}</div>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Control name="unit" placeholder="Unit# "
                                                    /* Set onChange to handleChange */
                                                    onChange={handleChange}
                                                    /* Set onBlur to handleBlur */
                                                    onBlur={handleBlur}
                                                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                    value={values.unit}
                                                    className={touched.unit && errors.unit ? "error" : null}
                                                />
                                                {touched.unit && errors.unit ? (
                                                    <div className="error-message">{errors.unit}</div>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                {/* <Form.Control name="city" placeholder="City" */}

                                                {/* onChange={handleChange} */}

                                                {/* onBlur={handleBlur} */}

                                                {/* value={values.city} */}
                                                {/* className={touched.city && errors.city ? "error" : null} */}
                                                {/* /> */}
                                                <SearchLocationInput
                                                // onBlur={handleBlur}
                                                // onChange={handleChange} 
                                                // className={touched.city && errors.city ? "error" : null}
                                                />
                                                {/* {touched.city && errors.city ? (
                                                    <div className="error-message">{errors.city}</div>
                                                ) : null} */}
                                            </Col>
                                            <Col className="seller-state-checkbox">
                                                <Form.Select name="states" defaultValue="Choose..."
                                                    /* Set onChange to handleChange */
                                                    onChange={handleChange}
                                                    /* Set onBlur to handleBlur */
                                                    onBlur={handleBlur}
                                                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                    value={values.states}
                                                    className={touched.states && errors.states ? "error" : null}
                                                >
                                                    {touched.states && errors.states ? (
                                                        <div className="error-message">{errors.states}</div>
                                                    ) : null}
                                                    <option value="0">Choose...</option>
                                                    <option value="AK">AK</option>
                                                    <option value="AL">AL</option>
                                                    <option value="AR">AR</option>
                                                    <option value="AS">AS</option>
                                                    <option value="AZ">AZ</option>
                                                    <option value="CA">CA</option>
                                                    <option value="CO">CO</option>
                                                    <option value="CT">CT</option>
                                                    <option value="DC">DC</option>
                                                    <option value="DE">DE</option>
                                                    <option value="FL">FL</option>
                                                    <option value="FM">FM</option>
                                                    <option value="GA">GA</option>
                                                    <option value="GU">GU</option>
                                                    <option value="HI">HI</option>
                                                    <option value="IA">IA</option>
                                                    <option value="ID">ID</option>
                                                    <option value="IL">IL</option>
                                                    <option value="IN">IN</option>
                                                    <option value="KS">KS</option>
                                                    <option value="KY">KY</option>
                                                    <option value="LA">LA</option>
                                                    <option value="MA">MA</option>
                                                    <option value="MD">MD</option>
                                                    <option value="ME">ME</option>
                                                    <option value="MH">MH</option>
                                                    <option value="MI">MI</option>
                                                    <option value="MN">MN</option>
                                                    <option value="MO">MO</option>
                                                    <option value="MP">MP</option>
                                                    <option value="MS">MS</option>
                                                    <option value="MT">MT</option>
                                                    <option value="NC">NC</option>
                                                    <option value="ND">ND</option>
                                                    <option value="NE">NE</option>
                                                    <option value="NH">NH</option>
                                                    <option value="NJ">NJ</option>
                                                    <option value="NM">NM</option>
                                                    <option value="NV">NV</option>
                                                    <option value="NY">NY</option>
                                                    <option value="OH">OH</option>
                                                    <option value="OK">OK</option>
                                                    <option value="OR">OR</option>
                                                    <option value="PA">PA</option>
                                                    <option value="PR">PR</option>
                                                    <option value="PW">PW</option>
                                                    <option value="RI">RI</option>
                                                    <option value="SC">SC</option>
                                                    <option value="SD">SD</option>
                                                    <option value="TN">TN</option>
                                                    <option value="TX">TX</option>
                                                    <option value="UT">UT</option>
                                                    <option value="VA">VA</option>
                                                    <option value="VI">VI</option>
                                                    <option value="VT">VT</option>
                                                    <option value="WA">WA</option>
                                                    <option value="WI">WI</option>
                                                    <option value="WV">WV</option>
                                                    <option value="WY">WY</option>
                                                </Form.Select>
                                            </Col>
                                            <Col>
                                                <Form.Control name="zipcode" placeholder="Zipcode"
                                                    /* Set onChange to handleChange */
                                                    onChange={handleChange}
                                                    /* Set onBlur to handleBlur */
                                                    onBlur={handleBlur}
                                                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                    value={values.zipcode}
                                                    className={touched.zipcode && errors.zipcode ? "error" : null}
                                                />
                                                {touched.zipcode && errors.zipcode ? (
                                                    <div className="error-message">{errors.zipcode}</div>
                                                ) : null}
                                            </Col>
                                        </Row>
                                        <Stack className="col-md-2 mx-auto">
                                            <Button variant="secondary" onClick={() => this.latlang(values)}>Continue</Button>
                                        </Stack>
                                    </Stack>
                                </FormGroup>

                                <div className="seller-spacing">
                                </div>
                                {/* Property section description element */}
                                <Form.Group as={Row} className="mb-3" controlId="formSetName">
                                    <Form.Label className="sellerWhiteColor" column sm="2">Property Name</Form.Label>

                                    <Col sm="3">

                                        <Form.Control name="name" type="text" placeholder="House Dream"
                                            /* Set onChange to handleChange */
                                            onChange={handleChange}
                                            /* Set onBlur to handleBlur */
                                            onBlur={handleBlur}
                                            /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                            value={values.name}
                                            className={touched.name && errors.name ? "error" : null}
                                        />
                                        {touched.name && errors.name ? (
                                            <div className="error-message">{errors.name}</div>
                                        ) : null}
                                    </Col>

                                </Form.Group>

                                {/* Property section price element */}
                                <Form.Group as={Row} className="mb-3" controlId="formSetPrice">
                                    <Form.Label className="sellerWhiteColor" column sm="2">Set your price</Form.Label>
                                    <Col sm="3">
                                        <Form.Control name="price" type="text" placeholder="$$$.$$"
                                            /* Set onChange to handleChange */
                                            onChange={handleChange}
                                            /* Set onBlur to handleBlur */
                                            onBlur={handleBlur}
                                            /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                            value={values.price}
                                            className={touched.price && errors.price ? "error" : null}
                                        />
                                        {touched.price && errors.price ? (
                                            <div className="error-message">{errors.price}</div>
                                        ) : null}
                                    </Col>
                                </Form.Group>
                                {/* Property section add pictures element */}
                                <Form.Group as={Row} className="mb-3" controlId="formFileMultiple">
                                    <Form.Label className="sellerWhiteColor" column sm="2">Add Pictures</Form.Label>
                                    <Col sm="3">


                                        <input type="file" class="form-control" multiple name="file" onChange={this.onChangeHandler} />
                                        {touched.file && errors.file ? (
                                            <div className="error-message">{errors.file}</div>
                                        ) : null}
                                        <button type="button"
                                            class="btn btn-success btn-block seller-upoad-btn-margib"
                                            onClick={this.onClickHandler}>Upload</button>
                                        <div class="form-group">

                                            {/* <Progress max="100" color="secondary" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress> */}

                                            <ProgressBar className="seller-img-progressbar"
                                                striped variant="success"
                                                now={this.state.loaded} label={`${this.state.loaded}% completed`} />

                                        </div>
                                    </Col>
                                </Form.Group>
                                <div className="seller-spacing">
                                </div>
                                <h1>Contact Information</h1>
                                <Form.Group as={Row} className="mb-3" controlId="formPhone">
                                    <Form.Label className="sellerWhiteColor" column sm="2">Phone Number</Form.Label>

                                    <Col sm="3">

                                        <Form.Control name="phonenumber" type="text" placeholder="111-111-1111"
                                            /* Set onChange to handleChange */
                                            onChange={handleChange}
                                            /* Set onBlur to handleBlur */
                                            onBlur={handleBlur}
                                            /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                            value={values.phonenumber}
                                            className={touched.phonenumber && errors.phonenumber ? "error" : null}
                                        />
                                        {touched.phonenumber && errors.phonenumber ? (
                                            <div className="error-message">{errors.phonenumber}</div>
                                        ) : null}
                                    </Col>

                                </Form.Group>

                                <div className="seller-spacing">
                                </div>
                                {/* Home facts section*/}
                                <Row>
                                    <Col>
                                        <h1>Home Facts</h1>
                                    </Col>
                                </Row>
                                {/* More details section for home */}
                                <Accordion >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="seller-accordion-button">Tell us more about your house</Accordion.Header>
                                        <Accordion.Body className="seller-bg-color-blue seller-rounded-corners">
                                            <Row className="mb-3">

                                                <Form.Group as={Col} controlId="formGridhomeType">
                                                    <Form.Label className="sellerBlackColor">Home Type</Form.Label>
                                                    <Form.Select name="homeType" defaultValue="Choose..."
                                                        /* Set onChange to handleChange */
                                                        onChange={handleChange}
                                                        /* Set onBlur to handleBlur */
                                                        onBlur={handleBlur}
                                                        /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                        value={values.homeType}
                                                        className={touched.homeType && errors.homeType ? "error" : null}
                                                    >
                                                        {touched.homeType && errors.homeType ? (
                                                            <div className="error-message">{errors.homeType}</div>
                                                        ) : null}
                                                        <option>Choose...</option>
                                                        <option value="MultiFamily">Multi Family</option>
                                                        <option value="Condo/co-op">Condo/Co-op</option>
                                                        <option value="Houses">Houses</option>
                                                        <option value="TownHomes">TownHomes</option>
                                                        <option value="Lots/Lands">Lots/Lands</option>
                                                        <option value="Apartments">Apartments</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridHoa">
                                                    <Form.Label className="sellerBlackColor">HOA dues per month</Form.Label>
                                                    <Form.Control name="hoa"

                                                        /* Set onChange to handleChange */
                                                        onChange={handleChange}
                                                        /* Set onBlur to handleBlur */
                                                        onBlur={handleBlur}
                                                        /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                        value={values.hoa}
                                                        className={touched.hoa && errors.hoa ? "error" : null}
                                                    />
                                                    {touched.hoa && errors.hoa ? (
                                                        <div className="error-message">{errors.hoa}</div>
                                                    ) : null}
                                                </Form.Group>



                                                <Form.Group as={Col} controlId="formGridBeds">
                                                    <Form.Label className="sellerBlackColor">Beds</Form.Label>
                                                    <Form.Control name="beds"

                                                        /* Set onChange to handleChange */
                                                        onChange={handleChange}
                                                        /* Set onBlur to handleBlur */
                                                        onBlur={handleBlur}
                                                        /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                        value={values.beds}
                                                        className={touched.beds && errors.beds ? "error" : null}
                                                    />
                                                    {touched.beds && errors.beds ? (
                                                        <div className="error-message">{errors.beds}</div>
                                                    ) : null}
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridBaths">
                                                    <Form.Label className="sellerBlackColor">Baths</Form.Label>
                                                    <Form.Control name="baths"
                                                        /* Set onChange to handleChange */
                                                        onChange={handleChange}
                                                        /* Set onBlur to handleBlur */
                                                        onBlur={handleBlur}
                                                        /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                        value={values.baths}
                                                        className={touched.baths && errors.baths ? "error" : null}
                                                    />
                                                    {touched.baths && errors.baths ? (
                                                        <div className="error-message">{errors.baths}</div>
                                                    ) : null}
                                                </Form.Group>



                                                <Form.Group as={Col} controlId="formGridSqFt">
                                                    <Form.Label className="sellerBlackColor">Finished square feet</Form.Label>
                                                    <Form.Control name="squareFeet"
                                                        /* Set onChange to handleChange */
                                                        onChange={handleChange}
                                                        /* Set onBlur to handleBlur */
                                                        onBlur={handleBlur}
                                                        /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                        value={values.squareFeet}
                                                        className={touched.squareFeet && errors.squareFeet ? "error" : null}
                                                    />
                                                    {touched.squareFeet && errors.squareFeet ? (
                                                        <div className="error-message">{errors.squareFeet}</div>
                                                    ) : null}
                                                </Form.Group>


                                                <Form.Group as={Col} controlId="formGridYear">
                                                    <Form.Label className="sellerBlackColor">Year built</Form.Label>
                                                    <Form.Control name="year"
                                                        /* Set onChange to handleChange */
                                                        onChange={handleChange}
                                                        /* Set onBlur to handleBlur */
                                                        onBlur={handleBlur}
                                                        /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                        value={values.year}
                                                        className={touched.year && errors.year ? "error" : null}
                                                    />
                                                    {touched.year && errors.year ? (
                                                        <div className="error-message">{errors.year}</div>
                                                    ) : null}
                                                </Form.Group>

                                            </Row>



                                            <Row className="col-md-4 mx-auto" >
                                                <Col >
                                                    <Form.Label className="sellerBlackColor">Describe your home</Form.Label>
                                                    <FloatingLabel className="sellerBlackColor" controlId="floatingTextarea2" label="Beautiful elegant...">
                                                        <Form.Control
                                                            as="textarea"
                                                            placeholder="Description"
                                                            className="sellerBlackColor sellerDescHeight"
                                                            name="description"
                                                            /* Set onChange to handleChange */
                                                            onChange={handleChange}
                                                            /* Set onBlur to handleBlur */
                                                            onBlur={handleBlur}
                                                            /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                            value={values.description}
                                                            className={touched.description && errors.description ? "error" : null}
                                                        />
                                                        {touched.description && errors.description ? (
                                                            <div className="error-message">{errors.description}</div>
                                                        ) : null}
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>


                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>


                                <div className="seller-spacing">
                                </div>

                                <Row className="col-md-4 mx-auto" >
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                required
                                                label="Please click here to agree to our terms and conditions"
                                                feedback="You must agree before submitting."
                                                feedbackType="invalid"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* the form submits when the user clicks the submit button, 
                                while the form is being submitted the button is inactive,
                                and after submission is complete the form resets and clears the fields.*/}

                                <Stack className="col-md-3 mx-auto">
                                    <Button variant="secondary" type="submit" disabled={isSubmitting}>POST MY HOUSE FOR SALE!</Button>

                                </Stack>


                            </Form>
                        )}
                    </Formik>

                </div>
            </Container>

        );
    }
}

//Redux settings for getting current user details if login user done
AddPosting.propTypes = {
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
)((AddPosting));