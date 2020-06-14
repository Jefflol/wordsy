import {
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL,
  DELETE_ENTRY_SUCCESS,
  DELETE_ENTRY_FAIL,
  LOAD_ENTRIES
} from '../actions/types';

const initialState = {
  userId: null,
  word: null,
  definition: null,
  example: null,
  isEntryLoading: false,
  isEntryAdded: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case LOAD_ENTRIES:
      return {
        ...state,
        isEntryLoading: true,
        isEntryAdded: false,
      };
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        wordEntry: action.payload.entry,
        isEntryLoading: false,
        isEntryAdded: false,
      };
    case GET_ENTRIES_FAIL:
      return {
        ...state,
        isEntryLoading: false,
        isEntryAdded: false,
      };
    case ADD_ENTRY_SUCCESS:
      return {
        ...state,
        isEntryLoading: false,
        isEntryAdded: true,
      };
    case ADD_ENTRY_FAIL:
    case DELETE_ENTRY_FAIL:
    case DELETE_ENTRY_SUCCESS:
    default: return state;
  }
}