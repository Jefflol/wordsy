import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ERROR_USER_EXISTS,
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
}