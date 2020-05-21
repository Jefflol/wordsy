import {
  CLEAR_ERRORS,
  ERROR_USER_EXISTS
} from '../actions/types';

const initialState = {
  msg: null,
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
        id: null
      };
    case ERROR_USER_EXISTS:
      return {
        msg: 'Username already taken',
        status: 409,
        id: 'ERROR_USER_EXISTS'
      }
    default: return state;
  }
}