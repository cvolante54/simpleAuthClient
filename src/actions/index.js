import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, REFRESH_ERROR, FETCH_MESSAGE } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({email, password}){
  return function(dispatch){
    //submit email, password to the server
    axios.post(`${API_URL}/signin`, {email, password})
      .then(response => {
        //if request is good...

        //- update state
        dispatch({ type: AUTH_USER });
        //- save jwt token
        localStorage.setItem('token', response.data.token);
        //- redirect
        browserHistory.push('/feature');
      })
      .catch((error) => {
        //if request is bad...
        //- show an error to the user
        console.log(error.response);
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({email, password}){
  return function(dispatch){
    //submit email, password to the server
    axios.post(`${API_URL}/signup`, {email, password})
      .then(response => {
        //- update state
        dispatch({ type: AUTH_USER });
        //- save jwt token
        localStorage.setItem('token', response.data.token);
        //- redirect
        browserHistory.push('/feature');
      })
      .catch(error => {
        //if request is bad...
        //- show an error to the user
        dispatch(authError(error.response.data.error));
      });
  }
}

export function refreshError(){
  return {type: REFRESH_ERROR};
}

export function signoutUser(){
  //remove token from local storage
  localStorage.removeItem('token');
  //update state
  return {type: UNAUTH_USER};
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(res => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: res.data.message
        });
      })
  }
}
