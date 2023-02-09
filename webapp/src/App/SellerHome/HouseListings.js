import ReactDOM from "react-dom";
import React, { useState } from "react";
import "./HouseListings.scss";
import { Alert, Container, CloseButton } from 'react-bootstrap'
import { Link } from "react-router-dom";
import HouseDetails from './HouseDetails';
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../Store/actions/authActions";
class HouseListings extends React.Component
{
  //refreshing:true;
  constructor(props)
  {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      refreshing: true,
      seen: false,
      varItem: [],
      item: this.props.card,
      updateCheck: this.props.seen,
      loca: JSON.parse(localStorage.getItem('loggedInUser')),

    };

    //bind method to this
    this.refreshdata = this.refreshdata.bind(this);
    this.callDelete = this.callDelete.bind(this);
    this.callUpdate = this.callUpdate.bind(this);
    this.togglePop = this.togglePop.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  // toggle method
  togglePop()
  {
    console.log('inside update');
    this.setState({
      seen: !this.state.seen
    });
    console.log('seen: ' + this.state.seen);
    //return <PopUp/>
  }

  //called when component is loaded
  componentDidMount()
  {
    fetch('http://localhost:3001/houses')
      .then(res => res.json())
      .then(result =>
      {
        this.setState({
          isLoaded: true,
          items: result
        });
      });

    if (this.state.updateCheck === true) {
      this.setState({
        seen: true
      })
    }

    // console.log('componentdidmount this.props.auth.user.email: '+this.props.auth.user.email);
    console.log('componentdidmount this.state.loca: '+this.state.loca.email);
  }

  //called when a house card is deleted
  callDelete(e)
  {
    alert("Deleting the listing");
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
      //updating the status to completed.
      //   body: JSON.stringify({          
      //   status: 'Completed' })
    };
    console.log(e);
    console.log(e.target);
    //sending a URL with ID attached so that the status of only that particular ID will get updated
    fetch(`http://localhost:3001/houses/${e.target.name}`, requestOptions)
      .then(response => response.json()).then(this.refreshdata);

    // this.refreshdata;
    this.setState({ refreshing: this.state.refreshing ? false : true });
    //refreshing = refreshing ? false : true;

  }

  //called when card is updated
  callUpdate(card)
  {
    alert('Updating' + card);
    // alert(card.target.name);  
    //console.log(this.state.items)
    //this.state.items.find(card.target.name)
    //var item;
    //get item whose id matches
    for (const element of this.state.items) {

      if (element.id === card.target.name) {
        console.log('found' + element.id);
        this.setState({

          varItem: element
        })
      }

      // render()
      return ('success')
    }
  }

  //refresh method, loads data
  refreshdata()
  {
    fetch('http://localhost:3001/houses')
      .then(res => res.json())
      .then(result =>
      {
        this.setState({
          isLoaded: true,
          items: result
        });
      });

  }

  //display each card
  renderCard = (item, index) =>
  {
    // console.log("inside cards" + card.price)
    return (
      <>
        <HouseDetails displayitem={item} isLoaded items />
      </>
    );
  }

  //main render method
  render()
  {
    const { items } = this.state;
    
   
    return (
      <Container>
        <Alert variant="primary">
          <Link to="/sellerHome"><CloseButton variant="black" /></Link>
          <hr />
          <h1> Your amazing property Lists!</h1>
          <hr />
          Click to modify or delete
          <hr />
        </Alert>

        <div className="seller-card-list-padding seller-card-main-wrapper" >
          {/* populate each house details */}
          {/* {items.filter(name => name.sellerEmailId === this.props.auth.user.email).map(this.renderCard)} */}
          {items.filter(name => name.sellerEmailId === this.state.loca.email).map(this.renderCard)} 

        </div>
        {/* Chat component */}
      </Container>
    );
  }

}


//Redux settings for getting current user details if login user done
HouseListings.propTypes = {
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
)((HouseListings));