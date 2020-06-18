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
  LOAD_ENTRY,
  LOAD_EDIT_FORM,
  LOAD_EDIT_FORM_SUCCESS,
  LOAD_EDIT_FORM_FAIL,
  EDIT_ENTRY_SUCCESS,
  EDIT_ENTRY_FAIL
} from '../actions/types';

const initialState = {
  userId: null,
  word: null,
  definition: null,
  example: null,
  isEntryLoading: false,
  isEntryAdded: false,
  isWordDetailsLoading: false,
  isLoadingEdit: false,
  isEditing: false,
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
    case LOAD_EDIT_FORM_SUCCESS:
      return {
        ...state,
        isLoadingEdit: false,
      };
    case LOAD_EDIT_FORM:
      return {
        ...state,
        wordDetails: action.payload.entry,
        isLoadingEdit: true,
        isEditing: true
      };
    case EDIT_ENTRY_SUCCESS:
      return {
        ...state,
        isEditing: false
      }
    case ADD_ENTRY_FAIL:
    case GET_ENTRY_FAIL:
    case GET_ENTRIES_FAIL:
    case DELETE_ENTRY_FAIL:
    case DELETE_ENTRY_SUCCESS:
    case LOAD_EDIT_FORM_FAIL:
    case EDIT_ENTRY_FAIL:
      return {
        ...state,
        userId: null,
        word: null,
        definition: null,
        example: null,
        isEntryLoading: false,
        isEntryAdded: false,
        isWordDetailsLoading: false,
        isLoadingEdit: false,
        isEditing: false
      };
    default: return state;
  }
}