import {combineReducers} from 'redux';
import {EMP_DIR_REQUEST, EMP_DIR_SUCCESS, EMP_DIR_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';
import {getById, getAllIds} from './index';
import * as KEYS from '../store/keyMap';

const debug = 0;

/**
 * Reducer for all empoyees in empoyee directory
 * @param  {object} state     - immutable section of store
 * @param  {object} action    - contains a type and other information
 * @return {object} state     - new state of employee directory data
 */
export const empDirReducer = (state = initialState.empDir, action) => {
  switch (action.type) {
    case EMP_DIR_REQUEST:
      return state;
    case EMP_DIR_SUCCESS:
      if (debug) console.log(action.employees);
      return {
        byId: getById(action.employees, KEYS.USER_SAM),
        allIds: getAllIds(action.employees, KEYS.USER_SAM)
      };
    case EMP_DIR_FAILURE:
      return state;
    default:
      return state;
  }
};
