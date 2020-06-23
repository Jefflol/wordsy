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
  LOAD_ENTRY,
  LOAD_EDIT_FORM,
  LOAD_EDIT_FORM_SUCCESS,
  LOAD_EDIT_FORM_FAIL,
  EDIT_ENTRY_SUCCESS,
  EDIT_ENTRY_FAIL
} from './types';

// Add a word entry
export const addWordEntry = ({ userId, word, definition, example }) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ userId, word, definition, example });

  // Add a word
  axios.post(`/entry/${userId}`, body, tokenConfig(getState))
    .then(res => {
      // console.log(`[SUCCESS]: ADDED NEW WORD - ${word}`);
      dispatch({
        type: ADD_ENTRY_SUCCESS,
      });
      dispatch(getWordEntries(userId));
    })
    .catch(err => {
      // console.log('[ENTRY]: ', err);
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
      // console.log('[ENTRY]: ', err);
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
      // console.log('[SUCCESS]: RETRIEVED WORD');
      dispatch({
        type: GET_ENTRY_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      // console.log('[ENTRY]: ', err);
      dispatch({
        type: GET_ENTRY_FAIL
      });
    });
}


// Delete word entry for a user
export const deleteWordEntry = (userId, wordId) => (dispatch, getState) => {
  axios.delete(`/entry/${userId}/${wordId}`, tokenConfig(getState))
    .then(res => {
      // console.log('[SUCCESS]: DELETED WORD');
      dispatch({
        type: DELETE_ENTRY_SUCCESS
      });
      dispatch(getWordEntries(userId));
    })
    .catch(err => {
      // console.log('[ENTRY]: ', err);
      dispatch({
        type: DELETE_ENTRY_FAIL
      });
    })
};

// Load word details into entry form for editing
export const loadWordEntry = (userId, wordId) => (dispatch, getState) => {
  axios.get(`/entry/${userId}/${wordId}`, tokenConfig(getState))
    .then(res => {
      // console.log('[SUCCESS]: RETRIEVED WORD');
      dispatch({
        type: LOAD_EDIT_FORM,
        payload: res.data
      });
      dispatch({ type: LOAD_EDIT_FORM_SUCCESS });
    })
    .catch(err => {
      // console.log('[ENTRY]: ', err);
      dispatch({
        type: LOAD_EDIT_FORM_FAIL
      });
    });
}

// Edit word entry
export const editWordEntry = (userId, wordId, modifications) => (dispatch, getState) => {
  axios.patch(`/entry/${userId}/${wordId}`, modifications, tokenConfig(getState))
    .then(res => {
      // console.log('[SUCCESS]: EDITED WORD');
      dispatch({
        type: EDIT_ENTRY_SUCCESS,
      });
      dispatch(getWordEntries(userId));
    })
    .catch(err => {
      // console.log('[ENTRY]: ', err);
      dispatch({
        type: EDIT_ENTRY_FAIL
      });
    });
}

export const cancelEditWordEntry = () => dispatch => {
  dispatch({ type: EDIT_ENTRY_FAIL });
}