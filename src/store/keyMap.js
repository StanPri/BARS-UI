/**
 * Form data
 */
export const FORM_ID = 'id';
export const FORM_STATUS = 'requestState';
// Applicatnt Information
export const FORM_NAME = 'lastName'; // firstName -> TODO: combine first and last anme or jus ahve one?
export const FORM_PHONE = 'workPhoneNumber';
export const FORM_CELL = 'cellPhoneNumber';
export const FORM_EMAIL = 'receiverEmail';
export const FORM_LICENSE = 'licensePlate';
export const FORM_COMPANY = 'companyName';
export const FORM_COMPANY_ADDRESS = 'companyAddress';
export const FORM_SUP_NAME = 'supervisorLastName'; // supervisorFirstName -> TODO: combine first and last anme or jus ahve one?
export const FORM_SUP_EMAIL = 'supervisorEmail';
export const FORM_SUP_PHONE = 'supervisorPhone';
export const FORM_DIVISION = 'division';
export const FORM_UNIT = 'unitOrProject';
export const FORM_REQUEST_DATE = 'CreatedDateUtc';
// Access Requirements
export const FORM_AREAS = 'accessAreas';
export const FORM_HOURS = 'accessHours';
export const FORM_LEVELS = 'accessLevels';
export const FORM_AREA_OTHER = 'accessOtherArea';
export const FORM_REASON = 'accessReason';
// Vendor Section
export const FORM_VENDOR_START = 'VendorStartDateUtc';
export const FORM_VENDOR_END = 'VendorEndDateUtc';
// Approvals
export const FORM_KEYCARD = 'keycard';
export const FORM_ISSUE = 'issueDateUtc';
export const FORM_EXPIRE_DATE = 'expirationDateUtc';
export const FORM_APPROVAL_DATE_SUP = 'supervisorApprovalTimestampUtc';
export const FORM_APPROVAL_DATE_REC = 'receiverAgreementTimestampUtc';
export const FORM_APPROVAL_DATE_SEC = 'securityApprovalTimestampUtc';
// Sam accounts
export const FORM_SAM_SUBMIT = 'submitterSamAccount';
export const FORM_SAM_RECEIVE = 'receiverSamAccount';
export const FORM_SAM_SUPER = 'supervisorSamAccount';

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
