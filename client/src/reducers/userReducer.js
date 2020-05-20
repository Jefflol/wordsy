import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = {

};

export default function(state = initialState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    default: return state;
  }
}