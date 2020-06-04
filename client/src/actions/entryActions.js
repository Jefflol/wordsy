import axios from 'axios';

import {
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL
} from './types';

// Add a word entry
export const addWordEntry = ({ userId, word, definition, example }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ userId, word, definition, example });

  // Add a word
  axios.post('/entry', body, config)
    .then(res => {
      console.log('SUCCESS');
      dispatch({
        type: ADD_ENTRY_SUCCESS,
      });
    })
    .catch(err => {
      console.log('[ENTRY]: ', err);
      dispatch({
        type: ADD_ENTRY_FAIL
      });
    });
};


// Get word entry for a user
export const getWordEntries = () => dispatch => {
  axios.get('/entry')
    .then(res => {
      // console.log('[ENTRY]: GET WORD ENTRIES SUCCESS');
      // console.log(res.data);
      dispatch({
        type: GET_ENTRIES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('[ENTRY]: ', err);
      dispatch({
        type: GET_ENTRIES_FAIL
      });
    });
};