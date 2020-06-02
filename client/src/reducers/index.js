import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import entryReducer from './entryReducer';

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  entry: entryReducer
});