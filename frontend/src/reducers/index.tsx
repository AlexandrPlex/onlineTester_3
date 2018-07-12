import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import studentReducer from './studentReducer';

export const reducers = combineReducers({
  commonReducer,
  studentReducer,
});
