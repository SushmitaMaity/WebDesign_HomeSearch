import React, { useState, useEffect } from 'react';
import './ViewListing.scss';
import Cards from './Cards.js';
import Search from './Search.js';
import MyFavorites from './MyFavorites';
import MapContainer from './Map/MapContainer';
// used to get the longitude and latitude
import Geocode from 'react-geocode';

function ViewListing() {
  const [cardInfo, setcardInfo] = useState([]);
  const [filtered, setFiltered] = useState([]);
  // setting the initial center of the map
  const [center, setCenter] = useState({ lat: 42.3601, lng: -71.0589 });
  // to check if favorites component has to be shown or not
  const [showFavorites, setShowFavorite] = useState(false);
  // to check if filtered
  const [showFirst, setShowFirst] = useState(true);

  //Fetching data from house listing
  useEffect(() => {
    async function fetchData() {
      var toJson = (response) => response.json();
      fetch('config/config.json')
        .then(toJson)
        .then((config) => {
          fetch(config.home_api_url)
            .then(toJson)
            .then((cardInfo) => setcardInfo(cardInfo));
        });
    }
    fetchData();
  }, []);

  // function to get latitude and longitude of the search city
  function getLatLng(city) {
    Geocode.setApiKey('AIzaSyBK-xckagY7ua5F0qsjtzDVnxL0-63BquU');
    Geocode.setLanguage('en');
    Geocode.setRegion('us');
    Geocode.setLocationType('ROOFTOP');
    Geocode.enableDebug();

    Geocode.fromAddress(city).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // setting the center with the search cities latitude and longitude value
        setCenter({ lat: lat, lng: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Filtering based on city or state
  const handleFilterLocation = (location) => {
    // setShowFirst to check if filtered
    setShowFirst(false);
    // check if location(search field is not empty)
    if (location !== '') {
      // check if it includes the state or the city
      const filteredData = cardInfo.filter((item) => {
        const checkState = `${item.states}`;
        const checkCity = `${item.city}`;
        if (
          checkState.toLowerCase().includes(location.toLowerCase()) ||
          checkCity.toLowerCase().includes(location.toLowerCase())
        ) {
          // method called to get the latitude and longitude of the search field
          getLatLng(location);
          return item;
        } else {
          getLatLng(location);
        }
      });
      // setting the value of Filterd with filteredData
      setFiltered(filteredData);

    } else {
      // else setting the filtered with original card values
      setFiltered(cardInfo);
    }
  };

  // function to check if to display favorites
  const displayFavorites = (param) => {
    setShowFavorite(param);
  };

  return (
    <div className='buyerbody'>

      {/* div to display the search component  */}
      <div className='buyersearch'>
        <Search cardInfo={cardInfo} onLocation={handleFilterLocation} />
      </div>

      {/* dividing the page into 2 */}
      <div className='buyerdivide'>

        {/* div to display the map */}
        <div className='mapResults'>
          <MapContainer cardInfo={cardInfo} center={center}></MapContainer>
        </div>

        {/* div to display the listing or favorites  */}
        <div className='buyerbox2'>
          <h2>
            {/* changing the title based on showFavorites is true or not */}
            {showFavorites ? 'Favorites Listings' : 'Real Estate Listings'}
          </h2>

          {/*  the button to change the displayFavorites to true or false*/}
          <div className='buyerFavoritesbutton'>
            <button
              className='favoritebutton'
              onClick={() =>
                showFavorites ? displayFavorites(false) : displayFavorites(true)
              }
            >
              {/*  button text to change based on showFavorites value */}
              {showFavorites ? 'All Listing' : 'Favorites'}
            </button>
          </div>
          <br />

          <div className='col-sm-12'>
            <div className='row mt-3'>
              {/* if showFavorites is true go to the MyFavorites component  else if showFirst(check filtered) is true pass the full data else pass the filtered data*/}
              {showFavorites ?

                cardInfo.map((card, index) => (
                  <MyFavorites
                    displayFavorites={displayFavorites}
                    showFavorites={showFavorites}
                    cardInfo={card}
                    key={index}
                  />
                ))
                : showFirst ?
                  cardInfo.map((card, index) => (
                    <Cards cardInfo={card} key={index} />
                  ))
                  : filtered.map((card, index) => (
                    <Cards cardInfo={card} key={index} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewListing;
