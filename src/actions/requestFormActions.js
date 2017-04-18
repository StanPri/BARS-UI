import {reset} from 'redux-form';
import {CALL_API} from '../middleware/api';
import * as types from "./actionTypes";
import * as KEYS from '../store/keyMap';

const debug = 0;

// View exisiting request
export const requestFormView = data => ({type: types.REQUEST_FORM_VIEW, data});
// reset form
export const requestFormReset = data => ({type: types.REQUEST_FORM_RESET});

/**
 * Makes Put request to BARS API to submit an existing request
 * @param  {object} data   - data of entire form
 * @return {object}         - object that passes to api middleware
 */
export const submitNewRequest = data => {
  if (debug)
    console.log("\tSubmitting new request: ", data);
  return ({
    [CALL_API]: {
      endpoint: `/CreateNewRequest/`,
      method: 'post',
      body: data,
      types: [types.SUBMIT_NEW_REQUEST, types.SUBMIT_NEW_SUCCESS, types.SUBMIT_NEW_FAILURE]
    }
  });
}

/**
 * Makes Put request to BARS API to submit an existing request
 * @param  {number} id    - id number
 * @return {object}       - obejct that passes to api middleware
 */
export const submitExistingRequest = id => {
  if (debug)
    console.log("\tSubmitting existing request: ", id);
  // return {type: "testing submitExistingRequest"};
  return ({
    [CALL_API]: {
      endpoint: `/Approve/${id}`,
      method: 'put',
      types: [types.SUBMIT_EXISTING_REQUEST, types.SUBMIT_EXISTING_SUCCESS, types.SUBMIT_EXISTING_FAILURE]
    }
  });
}

/**
 * Hepler function to map field names for patch requests
 * @param  {object} data    - entire form data
 * @param  {array} fields   - fields to patch
 * @return {array}          - fields mapped to objects having an op, value, and path
 */
const mapFieldsForPatch = (data, fields) => fields.map(field => {
  let value = field.split('/');
  if (value.length > 1) {
    value = data[value[0]][value[1]];
  }
  else {
    value = data[field];
  }
  return ({"op": "replace", "path": `/${field}`, "value": value});
});

/**
 * Makes Patch request to BARS API to replace given fields
 * @param  {object} data    - entire form data
 * @param  {array} fields   - fields to patch
 * @return {object}         - object that passes to api middleware
 */
export const patchExisitingRequest = (data, fields) => {
  if (debug) {
    console.log("\tPatching existing request id: ", data[KEYS.FORM_ID]);
    console.log("\t\twith fields: ", mapFieldsForPatch(data, fields));
  }
  // return {type: "testing patchExisitingRequest"};
  return ({
    [CALL_API]: {
      endpoint: `/${data[KEYS.FORM_ID]}`,
      method: 'patch',
      body: mapFieldsForPatch(data, fields),
      types: [types.PATCH_EXISTING_REQUEST, types.PATCH_EXISTING_SUCCESS, types.PATCH_EXISTING_FAILURE]
    }
  });
}

/**
 * Makes put request to BARS API to cancel given reqeust
 * @param  {number} id        - id of request
 * @param  {string} reason    - reason for cancelling request
 * @return {object}           - object that passes to api middleware
 */
export const cancelExistingRequest = (id, reason) => {
  if (debug)
    console.log("Cancelling existing request: ", id, "  with reason: ", reason);
  return ({
    [CALL_API]: {
      endpoint: `/CancelBadgeRequest/${id}`,
      method: 'put',
      body: {
        "reason": reason
      },
      types: [types.CANCEL_EXISTING_REQUEST, types.CANCEL_EXISTING_SUCCESS, types.CANCEL_EXISTING_FAILURE]
    }
  });
}

/**
 * Makes post request to BARS API to escalate given reqeust
 * @param  {number} id        - id of request
 * @return {object}           - object that passes to api middleware
 */
export const escalateExistingRequest = id => {
  if (debug)
    console.log("Escalating existing request: ", id);
  return ({
    [CALL_API]: {
      endpoint: `/EscalateApprover/${id}`,
      method: 'put',
      types: [types.ESCALATE_EXISTING_REQUEST, types.ESCALATE_EXISTING_SUCCESS, types.ESCALATE_EXISTING_FAILURE]
    }
  });
}
