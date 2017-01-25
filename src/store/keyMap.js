/**
 * Form data
 */
export const FORM_ID = 'id';
export const FORM_STATUS = 'requestState';
// Applicatnt Information
export const FORM_NAME = 'lastName';
export const FORM_PHONE = 'workPhoneNumber';
export const FORM_CELL = 'cellPhoneNumber';
export const FORM_LICENSE = 'licensePlate';
export const FORM_EMAIL = 'receiverEmail';
export const FORM_COMPANY = 'companyName';
export const FORM_COMPANY_ADDRESS = 'companyAddress';
export const FORM_SUP_NAME = 'supervisorLastName';
export const FORM_SUP_PHONE = 'supervisorPhone';
export const FORM_SUP_EMAIL = 'supervisorEmail';
export const FORM_REQUEST_DATE = 'createdDate';
export const FORM_DIVISION = 'division';
export const FORM_UNIT = 'unitOrProject';
// Access Requirements
export const FORM_REASON = 'accessReason';
export const FORM_HOURS = 'accessHours';
export const FORM_AREAS = 'accessAreas';
export const FORM_AREA_OTHER = 'accessOtherArea';
// Vendor Section
export const FORM_VENDOR_START = 'vendorStartDate';
export const FORM_VENDOR_END = 'vendorEndDate';

/**
 * Lists
 */
export const LIST_APPROVALS = 'list_approvals';
export const LIST_REQUESTS = 'list_requests';

/**
 * User Info
 */
export const USER_ROLE = 'role';
export const USER_IS_VENDOR = 'is_vendor';

/**
 * Justifications
 */
export const JUSTIFICATIONS_OTHER = 'justification_other_area';



/* data format from api:

// Applicant Information
id : 1  // autogen from api

firstName : "First 0"
lastName : "Last 0"
workPhoneNumber : null
cellPhoneNumber : null
receiverEmail : null
licensePlate : null
companyName : null
companyAddress : null
supervisorFirstName : null
supervisorLastName : null
supervisorEmail : null
supervisorPhone : null
division : null
unitOrProject : null
createdDate : "2017-01-20T14:38:21.193"

// modified info
modifiedBySamAccount : "SomeUser 0"
modifiedDate : "2017-01-25T14:38:21.193"
requestState : 0  // state of request

// SAMS
submitterSamAccount : "SomeUser 0"
receiverSamAccount : "SomeUser 0"
supervisorSamAccount : "SomeSupervisor 0"

// Access Requirements
accessAreas : null
accessHours : 0
accessLevels : null
accessOtherArea : null
accessReason : null

vendorEndDate : null
vendorStartDate : null

// Approvals
securityApproverName : null
issueDate : null
expirationDate : null
keycard : null
*/
