import {
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  GET_ENTRY_SUCCESS,
  GET_ENTRY_FAIL,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL,
  DELETE_ENTRY_SUCCESS,
  DELETE_ENTRY_FAIL,
  LOAD_ENTRIES,
  LOAD_ENTRY
} from '../actions/types';

const initialState = {
  userId: null,
  word: null,
  definition: null,
  example: null,
  isEntryLoading: false,
  isEntryAdded: false,
  isWordDetailsLoading: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case LOAD_ENTRIES:
      return {
        ...state,
        isEntryLoading: true
      };
    case LOAD_ENTRY:
      return {
        ...state,
        isWordDetailsLoading: true
      };
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        wordEntry: action.payload.entry,
        isEntryLoading: false,
        isEntryAdded: false,
      };
    case GET_ENTRY_SUCCESS:
      return {
        ...state,
        wordDetails: action.payload.entry,
        isWordDetailsLoading: false
      };
    case ADD_ENTRY_SUCCESS:
      return {
        ...state,
        isEntryLoading: false,
        isEntryAdded: true,
      };
    case ADD_ENTRY_FAIL:
    case GET_ENTRY_FAIL:
    case GET_ENTRIES_FAIL:
    case DELETE_ENTRY_FAIL:
    case DELETE_ENTRY_SUCCESS:
      return {
        ...state,
        userId: null,
        word: null,
        definition: null,
        example: null,
        isEntryLoading: false,
        isEntryAdded: false,
        isWordDetailsLoading: false
      };
    default: return state;
  }
}