import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = {
  // token: localStorage.getItem('token'),
  // isAuthenticated: null,
  // isLoading: false,
  // user: null
  isRegistered: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      // localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
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
    default: return state;
  }
}