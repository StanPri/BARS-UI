import {reset} from 'redux-form';
import * as types from "./actionTypes";

export const formView = data => ({type: types.FORM_VIEW, data});
export const formNew = () => ({type: types.FORM_NEW});
