import React from 'react';
import Cards from './Cards.js';
import store from '../../Store/store';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../Store/actions/authActions';

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cardInfo,
      loca: JSON.parse(localStorage.getItem('loggedInUser')),
    };
  }

  render() {
    return (
      // checking if the id is present in the favorite array, if yes passing it to cards component
      this.state.cards.favorite.map((card, i) => {
        if (card !== undefined && card === this.state.loca.id) {
          return (
            <>
              <Cards cardInfo={this.state.cards} key={i} />
            </>
          );
        }
      })
    );
  }
}

// for redux -> user details
MyFavorites.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(MyFavorites);
