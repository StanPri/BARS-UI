import {REQUESTS_ALL_REQUEST, REQUESTS_ALL_SUCCESS, REQUESTS_ALL_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';
import {mapRequestsToById, getAllIds} from './index';
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
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case REQUESTS_ALL_SUCCESS:
      return {
        byId: mapRequestsToById(action.response, KEYS.FORM_ID),
        allIds: getAllIds(action.response, KEYS.FORM_ID),
        error: null,
        isFetching: false
      };
    case REQUESTS_ALL_FAILURE:
      return {
        ...initialState.requestsAll,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
};
