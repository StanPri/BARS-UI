import {combineReducers} from 'redux';
import {EMP_DIR_REQUEST, EMP_DIR_SUCCESS, EMP_DIR_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';
import {getById, getAllIds} from './index';
import * as KEYS from '../store/keyMap';

/**
 * Reducer for all empoyees in empoyee directory
 * @param  {object} state     - immutable section of store
 * @param  {object} action    - contains a type and other information
 * @return {object} state     - new state of employee directory data
 */
export const empDirReducer = (state = initialState.empDir, action) => {
  switch (action.type) {
    case EMP_DIR_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case EMP_DIR_SUCCESS:
      return {
        byId: getById(action.employees, KEYS.USER_SAM),
        allIds: getAllIds(action.employees, KEYS.USER_SAM),
        error: null,
        isFetching: false
      };
    case EMP_DIR_FAILURE:
      return {
        ...initialState.empDir,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
};
