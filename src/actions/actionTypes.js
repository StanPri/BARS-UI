export const BEGIN_FETCH_CALL = 'BEGIN_FETCH_CALL';
/******************* SECURITY API ************************/
// security api => JWT for user authentication
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
/********************* ED API ****************************/
// empoyee directory api => employee information
export const EMP_DIR_REQUEST = 'EMP_DIR_REQUEST';
export const EMP_DIR_SUCCESS = 'EMP_DIR_SUCCESS';
export const EMP_DIR_FAILURE = 'EMP_DIR_FAILURE';
/******************** BARS API ****************************/
// badge request api => list of all requests
export const REQUESTS_ALL_REQUEST = 'REQUESTS_ALL_REQUEST';
export const REQUESTS_ALL_SUCCESS = 'REQUESTS_ALL_SUCCESS';
export const REQUESTS_ALL_FAILURE = 'REQUESTS_ALL_FAILURE';
// badge request api => list of all requests user is invloved in
export const REQUESTS_USER_REQUEST = 'REQUESTS_USER_REQUEST';
export const REQUESTS_USER_SUCCESS = 'REQUESTS_USER_SUCCESS';
export const REQUESTS_USER_FAILURE = 'REQUESTS_USER_FAILURE';
// badge request api => list of all requests needing approval
export const REQUESTS_APPROVE_REQUEST = 'REQUESTS_APPROVE_REQUEST';
export const REQUESTS_APPROVE_SUCCESS = 'REQUESTS_APPROVE_SUCCESS';
export const REQUESTS_APPROVE_FAILURE = 'REQUESTS_APPROVE_FAILURE';

// View exisiting request
export const REQUEST_FORM_VIEW = 'REQUEST_FORM_VIEW';
// Clear form of values
export const REQUEST_FORM_RESET = 'REQUEST_FORM_RESET';

// Submit new request
export const SUBMIT_NEW_REQUEST = 'SUBMIT_NEW_REQUEST';
export const SUBMIT_NEW_SUCCESS = 'SUBMIT_NEW_SUCCESS';
export const SUBMIT_NEW_FAILURE = 'SUBMIT_NEW_FAILURE';
// Submit existing request for approval
export const SUBMIT_EXISTING_REQUEST = 'SUBMIT_EXISTING_REQUEST';
export const SUBMIT_EXISTING_SUCCESS = 'SUBMIT_EXISTING_SUCCESS';
export const SUBMIT_EXISTING_FAILURE = 'SUBMIT_EXISTING_FAILURE';
// Submit existing request for approval
export const CANCEL_EXISTING_REQUEST = 'CANCEL_EXISTING_REQUEST';
export const CANCEL_EXISTING_SUCCESS = 'CANCEL_EXISTING_SUCCESS';
export const CANCEL_EXISTING_FAILURE = 'CANCEL_EXISTING_FAILURE';
// Escalate existing request to next level manager
export const ESCALATE_EXISTING_REQUEST = 'ESCALATE_EXISTING_REQUEST';
export const ESCALATE_EXISTING_SUCCESS = 'ESCALATE_EXISTING_SUCCESS';
export const ESCALATE_EXISTING_FAILURE = 'ESCALATE_EXISTING_FAILURE';
// patch an exisiting request with new data
export const PATCH_EXISTING_REQUEST = 'PATCH_EXISTING_REQUEST';
export const PATCH_EXISTING_SUCCESS = 'PATCH_EXISTING_SUCCESS';
export const PATCH_EXISTING_FAILURE = 'PATCH_EXISTING_FAILURE';
