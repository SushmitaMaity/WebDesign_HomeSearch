import React from 'react';
import './SearchBar.scss';
import { Link } from "react-router-dom";
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../Store/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';

//adding constructor
class SearchBar extends React.Component{
  
  navigateToBuyer = () =>{
      return toast.info("Please Log in to continue");
  }
    render() {
      
        return(
 //adding search button on the homepage          
<div className="wrap">
   <div className="search">
      <input type="text" className="searchTerm" placeholder="Enter an address, ZIP code or city"></input>
      {/* link to the seller's page */}
      {this.props.auth && this.props.auth.user && this.props.auth.user.name ?
      <Link to="/buyerViewListing"> 
      <button type="submit" className="searchButton" onClick={()=>this.navigateToBuyer()}> 
        <i className="fa fa-search"></i>
       </button></Link> : 
       <button type="submit" className="searchButton" onClick={()=>this.navigateToBuyer()}> 
       <i className="fa fa-search"></i>
      </button>
    }
   </div>
</div>  
        );
    }
}
SearchBar.propTypes = {
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
)((SearchBar));