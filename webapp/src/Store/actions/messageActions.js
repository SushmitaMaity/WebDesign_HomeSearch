

import {
    GET_MESSAGES, GET_ERRORS
  } from "./types";
import store from "../store";

 // Register User
export const getMessages = () => dispatch => {
  fetch('http://localhost:3001/messages', {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
    },
  })
      .then(res => res.json()).then((data)=>{
            console.log("data in message actions ::::", data);
            dispatch({
              type: GET_MESSAGES,
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



