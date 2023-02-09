import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import "./AdvancedSearch.scss";
import Cards from "./Cards.js";
import { Link } from "react-router-dom";


const AdvancedSearch = () => {

    // geting the cards from search component
    const location = useLocation();
    const cards = location.state && location.state.getCard;

    // defining search parameters
    const [allCards, setAllCards] = useState(cards)
    const [filtered, setFiltered] = useState(cards)
    const [states, setStates] = useState("");
    const [priceMin, setPriceMin] = useState("0")
    const [priceMax, setPriceMax] = useState("100000000000000")
    const [beds, setBeds] = useState("0")
    const [baths, setBaths] = useState("0")
    const [showFiltered, setShowFiltered] = useState(true)

    // method setting state back to initial state when clear button is pressed
    const handleInitialize = (e) => {
        e.preventDefault();
        setStates("")
        setPriceMin("0")
        setPriceMax("100000000000000")
        setBeds("0")
        setBaths("0")
        setShowFiltered(true)
    }

    // method handling the filtering conditions
    const handleFilter = (e) => {
        setShowFiltered(false)
        e.preventDefault();

        // creating a new array - filteredcards, with values from the cards array
        let filteredCards = [...cards];

        // checking if state field is empty 
        if (states === "") {
            filteredCards = cards
                .filter(post => parseInt(post.price, 10) >= parseInt(priceMin, 10) && parseInt(post.price, 10) <= parseInt(priceMax, 10))
                .filter(post => parseInt(post.beds, 10) >= parseInt(beds, 10))
                .filter(post => parseInt(post.baths, 10) >= parseInt(baths, 10))
        }
        else {
            filteredCards = cards
                .filter(post => post.states.toLowerCase().indexOf(states.toLowerCase()) !== -1)
                .filter(post => parseInt(post.price, 10) >= parseInt(priceMin, 10) && parseInt(post.price, 10) <= parseInt(priceMax, 10))
                .filter(post => parseInt(post.beds, 10) >= parseInt(beds, 10))
                .filter(post => parseInt(post.baths, 10) >= parseInt(baths, 10))
        }

        // setting the filtered arrray(filteredCards) values to Filtered array
        setFiltered(filteredCards)
    }

    return (
        <div>
            <div>
                <Link to="/buyerViewListing">
                    <button variant="outline-dark" className="backbutton">Back</button>
                </Link> <br /><br /><br />
            </div>

            <Form >
                <Row>
                    <Col>
                        <Form.Control placeholder="Search State"
                            type="text"
                            name="location"
                            onChange={e => setStates(e.target.value)} />
                    </Col>
                    <Col>
                        <   Form.Control placeholder="Price Min"
                            type="number"
                            name="min price"
                            onChange={e => setPriceMin(e.target.value)} />
                    </Col>
                    <Col>
                        <   Form.Control placeholder="Price Max"
                            type="number"
                            name="max price"
                            onChange={e => setPriceMax(e.target.value)} />
                    </Col>

                    <Col>
                        <Form.Select className="me-sm-2" id="inlineFormBedSelect" defaultValue="Minimum no. of Beds"
                            onChange={e => setBeds(e.target.value)}>
                            <option disabled hidden>Minimum no. of Beds</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select className="me-sm-2" id="inlineFormBathSelect" defaultValue="Minimum no. of Baths"
                            onChange={e => setBaths(e.target.value)}>
                            <option disabled hidden>Minimum no. of Baths</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Select>
                    </Col>
                </Row>
                <div className="advancedSearchButtons">
                    <Button variant="dark" size="lg" type="submit" className="advancedSearch" onClick={handleFilter}>Search</Button>
                    <Button variant="dark" size="lg" type="submit" className="advancedSearch" onClick={handleInitialize}>Clear</Button>

                </div>

            </Form>
            <div className="col-sm-12">
                <div className="row mt-3">
                    {/* if showFiltered is true then the filtered arrray is mapped else the original array is mapped */}
                    {showFiltered ? allCards?allCards.map((card, index) => (<Cards cardInfo={card} key={index} />)):null : filtered.map((card, index) => (<Cards cardInfo={card} key={index} />))}
                </div>
            </div>
        </div>
    )

}

export default AdvancedSearch;


