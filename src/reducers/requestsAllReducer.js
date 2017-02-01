import {REQUESTS_ALL_REQUEST, REQUESTS_ALL_SUCCESS, REQUESTS_ALL_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';
import {getById, getAllIds} from './index';
import * as KEYS from '../store/keyMap';

/**
 * Reducer for all requests, not just users
 * @param  {object} state     - immutable section of store
 * @param  {object} action    - contains a type and other information
 * @return {object} state     - new state
 */
export const requestsAllReducer = (state = initialState.requestsAll, action) => {
  switch (action.type) {
    case REQUESTS_ALL_REQUEST:
      return state; // TODO: pass isFetching here like chuck norris has?
    case REQUESTS_ALL_SUCCESS:
      return {
        byId: getById(action.response, KEYS.FORM_ID),
        allIds: getAllIds(action.response, KEYS.FORM_ID)
      };
    case REQUESTS_ALL_FAILURE:
      return state; // TODO
    default:
      return state;
  }
};
