

import {
    GET_CONTACTS, GET_ERRORS
  } from "./types";
import store from "../store";

 // Register User
export const getContacts = () => dispatch => {
  fetch('http://localhost:3001/contactus', {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
    },
  })
      .then(res => res.json()).then((data)=>{
            console.log("data in contact actions ::::", data);
            dispatch({
              type: GET_CONTACTS,
              payload: data
            })
          })
           
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: ((err||{}).response||{}).data || 'Error unexpected'
        })
      );
      //return data;
  }; 



