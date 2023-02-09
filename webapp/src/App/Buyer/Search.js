import React, { useState } from 'react';
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Search.scss';

const Search = (props) => {
    const cardArray = props.cardInfo;
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    // method to handle onchange on the search field
    const handleInput = (event) => {
        const { value } = event.target;
        setCity(value);
        props.onLocation(value);
    };

    //   method to navigate to the advanced search page when button pressed
    const navigateClick = () => {
        console.log('Inside search cards' + cardArray);
        navigate('/AdvancedSearch', {
            state: {
                getCard: cardArray,
            },
        });
    };

    return (
        <Form>
            <Row>
                <Col md>
                    <FloatingLabel controlId='floatingInputGrid'>
                        <FloatingLabel
                            controlId='floatingInputGrid'
                            label='Search City or State'
                        >
                            <Form.Control
                                placeholder='Search City or State'
                                type='text'
                                name='location'
                                onChange={handleInput}
                            />
                        </FloatingLabel>
                    </FloatingLabel>
                </Col>

                <Col md className='buyerAdvSearch'>
                    <FloatingLabel
                        controlId='floatingSelectGrid'
                        onClick={() => navigateClick()}
                    >
                        <button
                            variant='dark'
                            size='lg'
                            type='submit'
                            className='buyerAdvSearchbutton'
                        >
                            Advanced Search
                        </button>
                    </FloatingLabel>
                </Col>
            </Row>
        </Form>
    );
};

export default Search;
