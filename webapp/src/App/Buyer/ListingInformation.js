import React, { useState } from 'react';
import './ListingInformation.scss';
import BookTour from './BookTour';
import { ListingInformationDetails } from './ListingInformationDetails';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../Store/actions/authActions';

const ListingInformation = (props) => {
    // variable to check if book button has been pressed
    const [book, setBook] = useState(false);

    //getting the card details
    const cardInfo = props.cardDetails;

    //function to handle the book tour button
    const bookTour = (param) => {
        //   if the user who added the listing tries to book tour it will give a message that they are not allowed to book
        if (props.auth.user.email === cardInfo.sellerEmailId) {
            setBook(false);
            alert('You are not allowed to book tour for your own property');
            //   else the book value is set to true
        } else {
            setBook(param);
        }
    };

    return (
        <React.Fragment>
            <div className='buyerBookTourbutton'>
                <button
                    className='buttonInfo'
                    //   this is to check if the book tour component or the details component have to be displayed
                    onClick={() => (book ? bookTour(false) : bookTour(true))}
                >
                    {/* this is to change the button text depending on the book value. ie if true then you are in book component so willl display back on the button */}
                    {book ? 'Back' : 'Book tour'}{' '}
                </button>
            </div>
            {/* to redirect the page based on the book value. I ftrue goes to BookTour Component else to ListingInformationDetails component */}
            {book ? (
                <BookTour
                    bookTour={bookTour}
                    book={book}
                    cardInfo={cardInfo}
                ></BookTour>
            ) : (
                <ListingInformationDetails
                    cardInfo={cardInfo}
                ></ListingInformationDetails>
            )}
        </React.Fragment>
    );
};


// redux part for the user
ListingInformation.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(ListingInformation);
