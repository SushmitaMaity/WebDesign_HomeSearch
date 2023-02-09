import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING, LOGIN_SUCCESS
  } from "./types";
import store from "../store";

 // Register User
export const signupUser = (userData, history) => dispatch => {
  //debugger
  console.log("userdata in signup action", userData);
  fetch('http://localhost:3001/signup', {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(
      {userData
      })

  })
     // .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: ((err||{}).response||{}).data || 'Error unexpected'
        })
      );
  }; 

// Login - get user token
export const loginUser = userData => dispatch => {
  fetch('http://localhost:3001/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userData })

    }).then((res)=> res.json()).then((data)=> {console.log("data in loginuser action", data);
    if(data.loginsuccess){
      localStorage.setItem("loggedInUser", JSON.stringify((data.data)));
      dispatch({
          
            type: SET_CURRENT_USER,
            payload: data.data
          
        })
      toast.success("Login successful ! ");
    }else if(data.emailnotfound){
      toast.info("Please Sign up before logging in");
    }
    else {
      toast.warn("Please enter correct Login Credentials");
    }
   
   
    dispatch({
      type : LOGIN_SUCCESS,
      payload: data.loginsuccess
    })
  })
//       .then(res => {
//         res.json();
        
//         console.log("Res in loginuser", res);
// // Save to localStorage
// // Set token to localStorage
// const { token } = res.data;
// localStorage.setItem("jwtToken", token);

// // Set token to Auth header
// setAuthToken(token);
// // Decode token to get user data
// const decoded = jwt_decode(token);
// // Set current user
// dispatch(setCurrentUser(decoded));
// }).then((res)=> console.log("res",res))
.catch(err =>
dispatch({
  type: GET_ERRORS,
  payload: ((err||{}).response||{}).data || 'Error unexpected'
})
);
};

/// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
  // User loading
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("loggedInUser");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    toast.success("Logout successful ! ");
    // store.remove('loggedIn');
  };

