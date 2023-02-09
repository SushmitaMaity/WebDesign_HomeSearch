import {
  GET_ALL_USERS,
    
  } from "../actions/types";
  //const isEmpty = require("is-empty");
  const initialState = {
    allUsers: [],
  };
  export default function(state = initialState, action) {
    console.log("action.payload in admin reducer", action.payload);
    switch (action.type) {
     
      case GET_ALL_USERS:
        console.log("inside get all users", action.payload);
        return {
          ...state,
          allUsers: action.payload
        };
     
      default:
        return state;
    }
  }