import React from 'react';
import './ListingDetails.scss';
import ListingImages from './ListingImages';
import ListingInformation from './ListingInformation';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ListingDetails = (props) => {

    // get the card values from the Card component
  const location = useLocation();
  const card = location.state.getCard;

  return (
    <div className='buyerListingbody'>
      <Link to='/buyerViewListing'>
        <button variant='outline-dark' className='backbutton'>
          Back
        </button>
      </Link>

    {/* dividing the page to 2 parts  */}
      <div className='buyerListingdivide'>
        <div className='buyerListingbox1'>
          <ListingImages cardDetails={card} />
        </div>

        <div className='buyerListingbox2'>
          <ListingInformation cardDetails={card} />
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
