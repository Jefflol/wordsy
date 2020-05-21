import {
  CLEAR_ERRORS,
  ERROR_USER_EXISTS,
  ERROR_INVALID_CREDENTIALS
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
      };
    case ERROR_INVALID_CREDENTIALS:
      return {
        msg: 'Incorrect username or password',
        status: 401,
        id: 'ERROR_INVALID_CREDENTIALS'
      };
    default: return state;
  }
}