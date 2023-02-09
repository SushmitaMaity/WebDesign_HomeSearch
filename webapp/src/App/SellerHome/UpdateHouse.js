
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './UpdateHouse.scss';
import { Alert, CloseButton, Form, Stack, Button, Row, Col, FormGroup, FloatingLabel, RangeSlider, InputGroup, FormControl, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Geocode from "react-geocode";
import Accordion from 'react-bootstrap/Accordion'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useLocation, Link } from "react-router-dom";

//update a house 
const UpdateHouse = (props) => {
    const location = useLocation();
    console.log("location", location)
    //variable for card house
    const [thiscard, setThiscard] = useState(location.state.getCard);
    const [updateCard, setUpdateCard] = useState({});

    const [INITIAL_VALUES, setINITIAL_VALUES] = useState({
        streetAddress: thiscard.streetAddress, unit: thiscard.unit,
        city: thiscard.city,
        states: thiscard.states, zipcode: thiscard.zipcode,
        price: thiscard.price, file: thiscard.file,
        phonenumber: thiscard.phonenumber,
        pics: thiscard.pics,
        homeType: thiscard.homeType, hoa: thiscard.hoa,
        squareFeet: thiscard.squareFeet, year: thiscard.year,
        beds: thiscard.beds, baths: thiscard.baths,
        description: thiscard.description, name: thiscard.name
    });


    const navigate = useNavigate();

    //this will refresh the page
    useEffect(() => {
        console.log('Fruit', updateCard);
        //set intial values
        setINITIAL_VALUES({

            streetAddress: updateCard.streetAddress, unit: updateCard.unit,
            city: updateCard.city,
            states: updateCard.states, zipcode: updateCard.zipcode,
            price: updateCard.price, file: updateCard.file,
            phonenumber: updateCard.phonenumber,
            pics: updateCard.pics,
            homeType: updateCard.homeType, hoa: updateCard.hoa,
            squareFeet: updateCard.squareFeet, year: updateCard.year,
            beds: updateCard.beds, baths: updateCard.baths,
            description: updateCard.description, name: updateCard.name

        });
        console.log('in useeeffect INITIAL_VALUES:' + INITIAL_VALUES.description);
        // window.location.reload();
    }, [updateCard])

    //validation
    var validationSchema = Yup.object().shape({
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
            .max(100, "*City must be less than 100 characters")
            .required("*City is required"),
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
    });

    var piclist = [];
    var loaded = 0;

    //method called on submit
    const callHandleSubmit = (values) => {
        const requestOptions = {
            method: "PUT",
            // sending the above defined payload as body in Post request
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        };

        //debugging
        console.log('updating data is:' + values);
        console.log("http://localhost:3001/houses/" + thiscard.id);
        console.log('outside fetch: values is: ' + requestOptions.body)


        fetch("http://localhost:3001/houses/" + thiscard.id, requestOptions)
            .then((response) => response.json())
            .then(() => {
                console.log('inside fetch: values is: ' + values.id)
                // setThiscard(requestOptions.body);
                console.log('after put thiscard values:' + thiscard)
                //window.location.reload();
            })

            .catch((err) => console.log(err));

        //show success
        alert("Posting successfully updated!");
        // setThiscard(requestOptions.body);
        setUpdateCard(requestOptions.body);
        console.log('requestOptions.body:' + requestOptions.body)
        console.log('thiscard:' + updateCard.description)

        navigate('/viewMyListing');

    }

    //on change event method
    const onChangeHandler = event => {

        console.log('Chaning')

    }
    //method called on click to post pics
    const onClickHandler = () => {
        const data = new FormData()

        fetch("http://localhost:3001/pics",
            {
                method: 'POST', body: data
            })
            .then((response) => response.json())
            .then(json => console.log(json))
            .then(console.log('okay'))
            .catch((err) => console.log(err));
    }


    console.log('pics' + INITIAL_VALUES)

    //main return method
    return (
        // main contanier
        <Container>
            {/* heading alerts */}
            <Alert variant="primary">
                <Link to="/viewMyListing"><CloseButton variant="black" /></Link>
                <hr />
                <h1> Edit details of property - {thiscard.name}</h1>
                <hr />
                Let's begin...
                <hr />
            </Alert>

            <Container className="sellerWhiteColor">
                <div>
                    <Formik
                        initialValues={INITIAL_VALUES}
                        // Hooks up our validationSchema to Formik 
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            // When button submits form and form is in the process of submitting, submit button is disabled
                            setSubmitting(true);

                            Geocode.setApiKey("AIzaSyBK-xckagY7ua5F0qsjtzDVnxL0-63BquU");
                            Geocode.setLanguage("en");
                            Geocode.setRegion("us");
                            Geocode.setLocationType("ROOFTOP");
                            Geocode.enableDebug();

                            console.log(values.streetAddress);
                            console.log(values.city);
                            Geocode.fromAddress(values.streetAddress + " " + values.city).then(
                                (response) => {
                                    const { lat, lng } = response.results[0].geometry.location;
                                    values.lat = lat;
                                    values.lng = lng;
                                    console.log(lat);
                                    console.log(lng);
                                },
                                (error) => {
                                    console.error(error);
                                }
                            );

                            console.log('on subnit click : ' + piclist);

                            // submitting to database, shows us values submitted, resets form
                            setTimeout(() => {
                                //alert(JSON.stringify(values, null, 2));
                                resetForm();
                                setSubmitting(false);

                                callHandleSubmit(values);

                            }, 500);

                            //debugger

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
                                                <Form.Control name="unit" placeholder="Unit# (Optional)"
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
                                                <Form.Control name="city" placeholder="City"
                                                    /* Set onChange to handleChange */
                                                    onChange={handleChange}
                                                    /* Set onBlur to handleBlur */
                                                    onBlur={handleBlur}
                                                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                                    value={values.city}
                                                    className={touched.city && errors.city ? "error" : null}
                                                />
                                                {touched.city && errors.city ? (
                                                    <div className="error-message">{errors.city}</div>
                                                ) : null}
                                            </Col>
                                            <Col>
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


                                    </Stack>
                                </FormGroup>
                                <div className="seller-spacing">
                                </div>

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

                                <Accordion >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="seller-accordion-button">Tell us more about your house</Accordion.Header>
                                        <Accordion.Body className="seller-bg-color-blue seller-rounded-corners">
                                            <Row className="mb-3">

                                                <Form.Group as={Col} controlId="formGridhomeType">
                                                    <Form.Label className="sellerBlackColor">Home Type</Form.Label>
                                                    <Form.Select name="homeType"
                                                        // defaultValue="Choose..."
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
                                                label="Please click here to agree terms and conditions"
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
                                    {/* <Link to="/viewMyListing" >   */}
                                    <Button variant="secondary"
                                        type="submit" disabled={isSubmitting}>UPDATE MY HOUSE!</Button>
                                    {/* </Link> */}

                                </Stack>


                            </Form>
                        )}
                    </Formik>

                </div>
            </Container>

        </Container>
    )
}

export default UpdateHouse;
