

import {
    GET_ALL_USERS, GET_ERRORS
  } from "./types";
import store from "../store";

 // Register User
export const getAllUsers = () => dispatch => {
  let dataUser=[];
  fetch('http://localhost:3001/users', {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
    },
  })
      .then(res => res.json()).then((data)=>{
        dataUser = data;
            console.log("data in admin actions ::::", dataUser);
            dispatch({
              type: GET_ALL_USERS,
              payload: dataUser
            })
          })
           
         
          
          
          
      // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: ((err||{}).response||{}).data || 'Error unexpected'
        })
      );
      return dataUser;
  }; 



