/**
 * REQUEST FORM DATA
 */
export const FORM_ID = 'id';
export const FORM_STATUS = 'requestState';
// Applicatnt Information
export const FORM_NAME = 'fullName';
export const FORM_PHONE = 'workPhoneNumber';
export const FORM_CELL = 'cellPhoneNumber';
export const FORM_EMAIL = 'receiverEmail';
export const FORM_LICENSE = 'licensePlate';
export const FORM_COMPANY = 'companyName';
export const FORM_COMPANY_ADDRESS = 'companyAddress';
export const FORM_SUP_NAME = 'supervisorFullName';
export const FORM_SUP_EMAIL = 'supervisorEmail';
export const FORM_SUP_PHONE = 'supervisorPhoneNumber';
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
// Accept Terms and conditions
export const FORM_SECURITY_NAME = 'securityApproverName';
export const FORM_SECURITY_TIME = 'securityApprovalTimestampUtc';
export const FORM_TERMS = 'receiverAgreementTimestampUtc';
export const FORM_TERMS_SUP = 'supervisorApprovalTimestampUtc';
// Sam accounts
export const FORM_SAM_SUBMIT = 'submitterSamAccount';
export const FORM_SAM_RECEIVE = 'receiverSamAccount';
export const FORM_SAM_SUPER = 'supervisorSamAccount';
// submission info
export const FORM_SUBMIT_EMAIL = 'submitterEmail';
export const FORM_REJECT_REASON = 'cancellationReason';
/**
 * Form status codes
 */
export const STATUS_ERROR = 0;
export const STATUS_PEND_MGR = 1;
export const STATUS_PEND_REC = 2;
export const STATUS_PEND_SEC = 3;
export const STATUS_APPROVED = 4;
export const STATUS_CANCEL_MGR = 5;
export const STATUS_CANCEL_SEC = 6;
export const STATUS_CANCEL_REC = 7;
export const STATUS_CANCEL_SUB = 8;
export const STATUS_NAMES = [
  'Unknown State',
  'Waiting Supervisor Approval',
  'Waiting Recipient Approval',
  'Waiting Security Approval',
  'Approved',
  'Cancelled by Supervisor',
  'Cancelled by Security',
  'Cancelled by Recipient',
  'Cancelled by Submitter'
];

/**
 * Justifications
 */
export const JUSTIFICATIONS_OTHER = 'justification_other_area';

/**
 * USER ROLES
 */
export const ROLE_USERS = 'User';
export const ROLE_MANAGER = 'Manager';
export const ROLE_SECURITY = 'Security';
export const ROLE_RECIPIENT = 'Recipient';

/**
 * User Info (employee directory / jwt)
 */
export const USER_ROLE = 'role';
export const USER_NAME = 'fullName';
export const USER_SAM = 'samAccount';
export const USER_PHONE = 'deskPhone';
export const USER_CELL = 'cellPhone';
export const USER_EMAIL = 'email';
export const USER_NAME_MANAGER = 'manager';
export const USER_SAM_MANAGER = 'managerSamAccount';
export const USER_IS_MANAGER = 'isManager';
