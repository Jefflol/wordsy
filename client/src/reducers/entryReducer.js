import {
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL
} from '../actions/types';

const initialState = {
  userId: null,
  word: null,
  definition: null,
  example: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case ADD_ENTRY_FAIL:
    default: return state;
  }
}