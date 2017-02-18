import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInRequest(type) {
  return type.substring(type.length - 8) == "_REQUEST";
}

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == "_SUCCESS";
}

export default function fetchStatusReducer(state = initialState.fetchCallsInProgress, action) {
  if (actionTypeEndsInRequest(action.type)) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
