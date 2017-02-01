import {reset} from 'redux-form';
import { CALL_API } from '../middleware/api';
import * as types from "./actionTypes";

export const requestsGetAll = () => ({
  [CALL_API]: {
    endpoint: '/',
    types: [types.REQUESTS_ALL_REQUEST, types.REQUESTS_ALL_SUCCESS, types.REQUESTS_ALL_FAILURE]
  }
});
