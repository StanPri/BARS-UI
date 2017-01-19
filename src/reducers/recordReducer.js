import * as types from "../actions/actionTypes";

export default function recordReducer(state = [], action){
  switch (action.type) {

    case types.LOAD_RECORDS_SUCCESS:
      return action.records;

    case types.CREATE_RECORD_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.record)
      ];

    default:
      return state;
  }
}
