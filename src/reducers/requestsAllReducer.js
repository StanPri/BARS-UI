import {REQUESTS_ALL_REQUEST, REQUESTS_ALL_SUCCESS, REQUESTS_ALL_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';
import * as KEYS from '../store/keyMap';

// list of requests
// TODO: for inital state pass all (isfetching, etc, or just requestALl?)
export const requestsAllReducer = (state = initialState.requestsAll, action) => {
  switch (action.type) {
    case REQUESTS_ALL_REQUEST:
      return state; // TODO: pass isFetching here like chuck norris has?
    case REQUESTS_ALL_SUCCESS:
      return {
        byId: getById(action.response),
        allIds: getAllIds(action.response)
      };
    case REQUESTS_ALL_FAILURE:
      return state; // TODO
    default:
      return state;
  }
};

/**
 * Converts repsonse from api into byId object
 * @param  {object} data - repsonse from api
 * @return {object}      - object with signature {id1: data1, id2: data2, ...etc}
 */
const getById = data => {
  let _data = {};
  Object.keys(data).forEach(k => {
    _data[data[k][KEYS.FORM_ID]] = data[k];
  });
  return _data;
};

/**
 * Converts repsonse from api into allIds array
 * @param  {object} data - repsonse from api
 * @return {array}      - array of all ids with signature [id1, id2, ...etc]
 */
const getAllIds = data => Object.keys(data).map(k => data[k][KEYS.FORM_ID]);
