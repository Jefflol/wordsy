import {
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL
} from '../actions/types';

const initialState = {
  userId: null,
  word: null,
  definition: null,
  example: null,
  isEntryLoaded: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        wordEntry: action.payload.entry,
        isEntryLoaded: true,
      };
    case GET_ENTRIES_FAIL:
      return {
        ...state,
        isEntryLoaded: false,
      };
    case ADD_ENTRY_FAIL:
    case ADD_ENTRY_SUCCESS:
    default: return state;
  }
}