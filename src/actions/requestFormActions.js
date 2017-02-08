import {reset} from 'redux-form';
import * as types from "./actionTypes";
import * as KEYS from '../store/keyMap';

// samApproval: sam account of approver (manager/security)
export const requestFormView = data => ({type: types.REQUEST_FORM_VIEW, data});
export const requestFormNew = () => ({type: types.REQUEST_FORM_NEW});
