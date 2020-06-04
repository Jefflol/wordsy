import {
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAIL,
  LOAD_ENTRIES
} from '../actions/types';

const initialState = {
  userId: null,
  word: null,
  definition: null,
  example: null,
  isEntryLoading: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case LOAD_ENTRIES:
      return {
        ...state,
        isEntryLoading: true
      };
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        wordEntry: action.payload.entry,
        isEntryLoading: false,
      };
    case GET_ENTRIES_FAIL:
      return {
        ...state,
        isEntryLoading: false,
      };
    case ADD_ENTRY_SUCCESS:
      return {
        ...state,
        isEntryLoading: false,
      };
    case ADD_ENTRY_FAIL:
    default: return state;
  }
}