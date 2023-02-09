import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards.scss';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../Store/actions/authActions';
import ImageSlider from '../SellerHome/ImageSlider';

const Cards = (props) => {

  // getting the card details from ViewListing component
  const card = props.cardInfo;
  const navigate = useNavigate();


  const [cards, setCards] = useState(card);
  // to check if favorite is set or not
  const [fav, setFav] = useState(false);

  // to load the card values if updated
  useEffect(() => {
    setCards(card);
  }, [card]);

  // to check if favorites are present for the user or not and setting favorite as true
  useEffect(() => {
    const loca = JSON.parse(localStorage.getItem('loggedInUser'));
    for (var i = 0; i < card.favorite.length; i++) {
      if (card.favorite[i] !== undefined && card.favorite[i] === loca.id) {
        setFav(true);
      }
    }
  });

  // method to navigate to page displaying the individual details of this card
  const navigateClick = (card) => {
    navigate('/ListingDetails', {
      state: {
        getCard: card,
      },
    });
  };

  // Function to manage the like button
  const handleSubmit = (id, index) => (event) => {
    const loca = JSON.parse(localStorage.getItem('loggedInUser'));
    // this makes sure that the previous event is stopped 
    event.stopPropagation();

    // defined a new aray with the same value as cards
    let newArr = cards;

    // check if the favorite array storing the user id's is empty, if empty push the current user id when clicked
    if (newArr.favorite.length === 0) {
      newArr.favorite.push(loca.id);
      console.log('hi3');
      setFav(true);
    }// if not empty,check if the favorite arraycontains this user id's, if contained then remove it
    else {
      for (var i = 0; i < newArr.favorite.length; i++) {
        if (newArr.favorite[i] === loca.id) {
          newArr.favorite.splice(i, 1);
          setFav(false);
          console.log('hi1');
        }// this is to ignore the undefined case 
        else if (newArr.favorite[i] === undefined) {
          break;
        }// if none of the above conditions are true then push it t the arrray 
        else {
          newArr.favorite.push(loca.id);
          setFav(true);
          console.log('hi2');
          break;
        }
      }
    }

    // puting the updated favorite array to the backend
    fetch(`http://localhost:3001/houses/${id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        favorite: newArr.favorite,
      }),
    });
    setCards(newArr);
  };

  return (
    // onclick of the button go the the navigate method
    <div className='col-sm-4' onClick={() => navigateClick(card)}>
      <div className='card my-4'>
        {/* display images using the image slider */}
        <ImageSlider picsArray={card.pics} />
        <div className='card-body'>
          <h5 className='card-title'>
            ${card.price} | {card.name}
          </h5>
          <p className='card-text'>
            {card.homeType} | {card.beds} beds | {card.baths} bath |{' '}
            {card.squareFeet} sqft
          </p>
          <p className='card-text'>
            {card.city}{' '}
            <button
              className={fav ? 'buyerLikeButton' : 'buyerNotLikeButton'}
              onClick={handleSubmit(card._id)}
            >
              {' '}
              <i
                class='fas fa-heart  float-right p-1 my-1 mr-3'
                data-toggle='tooltip'
                data-placement='top'
                title='I like it'
              ></i>
            </button>
          </p>
          <p className='card-text'>
            On market - {dayjs(card.createdDate).format('DD MMMM YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
};

// redux part for the user
Cards.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Cards);
