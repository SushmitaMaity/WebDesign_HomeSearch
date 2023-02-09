import "./App.scss";
import Header from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Homescreen from './Homescreen/Homescreen';
import AdvancedSearch from "./Buyer/AdvancedSearch";
import { AboutUs } from "./AboutUs/AboutUs";
import { ContactUs } from "./ContactUs/ContactUs";
import SellerHome from './SellerHome/SellerHome';
import ViewListing from './Buyer/ViewListing';
import Admin from './Admin/Admin';
import AddPosting from './SellerHome/AddPosting';
import HouseListings from './SellerHome/HouseListings';
import ListingDetails from './Buyer/ListingDetails';
import UpdateHouse from './SellerHome/UpdateHouse';
import { Provider } from "react-redux";
import store from "../Store/store";
import { TourBooking } from './Tour/TourBooking';
import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import setAuthToken from "../Store/utils/setAuthToken";
import HotHomesdisplay from "./Homescreen/HotHomesdisplay";
import { setCurrentUser, logoutUser } from "../Store/actions/authActions";
import { Suspense, lazy } from 'react';
import Users from "./Admin/Users";

//redux authentication using jwt token
if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {

    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}
//main screen
const Homescreen = lazy(() => import('./Homescreen/Homescreen'));
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <div className="header">
              <Header></Header>
            </div>

            {/* <div className="nav">
              <NavPage></NavPage>
            </div> */}
            <Suspense fallback={<h1>Still Loading…</h1>}>     
            <div className="app-content">
              <Routes> {/* The Switch decides which component to show based on the current URL.*/}

                {/*Common Routes */}
                <Route path='/' element={<Homescreen />} />
                <Route path='/hothomes' element={<HotHomesdisplay />} />
                <Route path='/ContactUs' element={<ContactUs />} />
                <Route path='/AboutUs' element={<AboutUs />} />

                {/* Sellers Pages */}
                <Route path='/sellerHome' element={<SellerHome />} />
                <Route path='/addListing' element={<AddPosting />} />
                <Route path='/viewMyListing' element={<HouseListings />} />
                <Route path='/viewTourBooking' element={<TourBooking />} />
                <Route path='/UpdateHouse' element={<UpdateHouse />} />


                {/* Buyers Pages */}
                <Route path='/buyerViewListing' element={<ViewListing />} />
                <Route path='/ListingDetails' element={<ListingDetails />} />
                <Route path='/AdvancedSearch' element={<AdvancedSearch />} />

                {/* admin */}
                <Route path='/admin' element={<Admin />} />
                <Route path='/users' element = {<Users/>}/>

              </Routes>
            </div>
            </Suspense>
            <div className="footer">
              <Footer></Footer>
            </div>

          </div>
        </BrowserRouter></Provider>
    );
  }
}
//export app
export default App;
