/**
 * Reducer for employee directory information
 * constains all information about employees
 */
import {combineReducers} from 'redux';
import {EMP_DIR_REQUEST, EMP_DIR_SUCCESS, EMP_DIR_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';

export const empDirReducer = (state = initialState.empDir, action) => {
  switch (action.type) {
    case EMP_DIR_REQUEST:
      return state;// TODO: handle req case -> break up state?
    case EMP_DIR_SUCCESS:
      return action.employees;
    case EMP_DIR_FAILURE:
      return state; // TODO: handle error case -> break up state?
    default:
      return state;
  }
};
