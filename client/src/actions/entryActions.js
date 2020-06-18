import axios from 'axios';
import { tokenConfig } from './tokenConfig';

import {
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL,
  GET_ENTRY_SUCCESS,
  GET_ENTRY_FAIL,
  DELETE_ENTRY_SUCCESS,
  DELETE_ENTRY_FAIL,
  LOAD_ENTRIES,
  LOAD_ENTRY
} from './types';

// Add a word entry
export const addWordEntry = ({ userId, word, definition, example }) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ userId, word, definition, example });

  // Add a word
  axios.post(`/entry/${userId}`, body, tokenConfig(getState))
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
export const getWordEntries = (userId, sortType='recent') => (dispatch, getState) => {
  dispatch({ type: LOAD_ENTRIES });

  axios.get(`/entry/${userId}?sort=${sortType}`, tokenConfig(getState))
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


// Get details for a word
export const getWordEntry = (userId, wordId) => (dispatch, getState) => {
  dispatch({ type: LOAD_ENTRY });
  
  axios.get(`/entry/${userId}/${wordId}`, tokenConfig(getState))
    .then(res => {
      console.log('[SUCCESS]: RETRIEVED WORD');
      dispatch({
        type: GET_ENTRY_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('[ENTRY]: ', err);
      dispatch({
        type: GET_ENTRY_FAIL
      });
    });
}


// Delete word entry for a user
export const deleteWordEntry = (userId, wordId) => (dispatch, getState) => {
  axios.delete(`/entry/${userId}/${wordId}`, tokenConfig(getState))
    .then(res => {
      console.log('[SUCCESS]: DELETED WORD');
      dispatch({
        type: DELETE_ENTRY_SUCCESS
      });
      dispatch(getWordEntries(userId));
    })
    .catch(err => {
      console.log('[ENTRY]: ', err);
      dispatch({
        type: DELETE_ENTRY_FAIL
      });
    })
};