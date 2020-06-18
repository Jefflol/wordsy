import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  userId: null,
  username: null,
  isRegistered: false,
  isLoggedIn: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        username: action.payload.username,
        isLoggedIn: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        userId: null,
        username: null,
        isRegistered: false,
        isLoggedIn: false
      };
    default: return state;
  }
}