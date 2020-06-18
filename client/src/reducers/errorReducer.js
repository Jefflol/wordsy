import {
  CLEAR_ERRORS,
  ERROR_USER_EXISTS,
  ERROR_INVALID_CREDENTIALS
} from '../actions/types';

const initialState = {
  id: null,
  msg: null,
  status: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        id: null,
        msg: null,
        status: null
      };
    case ERROR_USER_EXISTS:
      return {
        ...state,
        id: 'ERROR_USER_EXISTS',
        msg: 'Username already taken',
        status: 409
      };
    case ERROR_INVALID_CREDENTIALS:
      return {
        ...state,
        id: 'ERROR_INVALID_CREDENTIALS',
        msg: 'Incorrect username and/or password',
        status: 401
      };
    default: return state;
  }
}