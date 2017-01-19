import * as types from "./actionTypes";
import RecordApi from '../api/mockRecordApi';
import {beginFetchCall} from './fetchStatusActions';

export function loadRecordsSuccess(records)
{
  return { type: types.LOAD_RECORDS_SUCCESS, records };
}

export function createRecordSuccess(record)
{
  return { type: types.CREATE_RECORD_SUCCESS, record};
}

export function loadRecords() {
  return function(dispatch) {
    //Updates fetch async status in thunk
    dispatch(beginFetchCall());

    return RecordApi.getAllRecords().then(records => {
      dispatch(loadRecordsSuccess(records));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveRecord(record) {
  return function (dispatch, getState) {
    //Updates fetch async status in thunk
    dispatch(beginFetchCall());

    return RecordApi.saveRecord(record).then(savedRecord => {
      dispatch(createRecordSuccess(savedRecord));
    }).catch(error => {
      throw(error);
    });
  };
}
