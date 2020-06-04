import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  // isAuthenticated: null,
  // isLoading: false,
  // user: null
  userId: null,
  username: null,
  isRegistered: false,
  isLoggedIn: true
};

export default function(state = initialState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      // localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        // ...action.payload,
        // isAuthenticated: true,
      //   isLoading: false
        isRegistered: true
      };
    case REGISTER_FAIL:
      // localStorage.removeItem('token');
      return {
        ...state,
        // token: null,
        // user: null,
        // isAuthenticated: null,
        // isLoading: false,
        isRegistered: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        // ...action.payload
        userId: action.payload.userId,
        username: action.payload.username,
        isLoggedIn: true
      };
    case LOGIN_FAIL:
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