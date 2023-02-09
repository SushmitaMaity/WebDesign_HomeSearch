import {
    SET_CURRENT_USER,
    USER_LOADING, 
    LOGIN_SUCCESS
  } from "../actions/types";
  //const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    loginSuccess: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          user: action.payload
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loginSuccess: action.payload
        }
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }