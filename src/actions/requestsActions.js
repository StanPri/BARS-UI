import {reset} from 'redux-form';
import { CALL_API } from '../middleware/api';
import * as types from "./actionTypes";

// export const requestGetById = data => ({type: types.REQUEST_FORM_VIEW, data});
// export const requestCreateNew = () => ({type: types.REQUEST_FORM_NEW});

export const requestsGetAll = () => ({
  [CALL_API]: {
    endpoint: '/',
    types: [types.REQUESTS_ALL_REQUEST, types.REQUESTS_ALL_SUCCESS, types.REQUESTS_ALL_FAILURE]
  }
});

//TODO:export const requestsGetByUser = () => (); //?name ok?
