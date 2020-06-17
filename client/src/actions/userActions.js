import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  ERROR_USER_EXISTS,
  ERROR_INVALID_CREDENTIALS,
  CLEAR_ERRORS
} from './types';

// Register User
export const registerUser = ({ username, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ username, password });

  // Sign up user
  axios.post('/users/signup', body, config)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      // ERROR: User already exists
      if(err.response.status === 409) {
        dispatch({
          type: ERROR_USER_EXISTS
        });
      }

      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const loginUser = ({ username, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  // Login User
  axios.post('/users/login', body, config)
    .then(res => {
      console.log(res.data);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      // ERROR: Invalid Credentials
      if(err.response.status === 401) {
        dispatch({
          type: ERROR_INVALID_CREDENTIALS
        });
      }

      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout user
export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};