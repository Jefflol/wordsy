import axios from 'axios';

import {
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL,
  LOAD_ENTRIES
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
      console.log(`[SUCCESS]: ADDED NEW WORD - ${word}`);
      dispatch({
        type: ADD_ENTRY_SUCCESS,
      });
      dispatch(getWordEntries(userId));
    })
    .catch(err => {
      console.log('[ENTRY]: ', err);
      dispatch({
        type: ADD_ENTRY_FAIL
      });
    });
};


// Get word entry for a user
export const getWordEntries = userId => dispatch => {
  dispatch({ type: LOAD_ENTRIES });

  axios.get(`/entry/${userId}`)
    .then(res => {
      // console.log('[SUCCESS]: GET ALL WORD ENTRIES');
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