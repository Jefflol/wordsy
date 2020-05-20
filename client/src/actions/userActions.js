import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
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
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL
      });
    });
}