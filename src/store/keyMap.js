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
export const FORM_SUP_NAME = 'supervisorFullName'; // direct supervisor
export const FORM_SUP_EMAIL = 'supervisorEmail';
export const FORM_SUP_PHONE = 'supervisorPhoneNumber';
export const FORM_MANAGER_NAME = 'supervisorsSupervisorFullName'; // supervisors manager
export const FORM_MANAGER_EMAIL = 'supervisorsSupervisorEmail';
export const FORM_MANAGER_PHONE = 'supervisorsSupervisorPhoneNumber';
export const FORM_APPROVERS = 'approversRadioButtonChoice';
/********* Internal values for approver (adjusted values from api) ****/
export const FORM_APPROVER_NAME = 'FORM_APPROVER_NAME';
export const FORM_APPROVER_EMAIL = 'FORM_APPROVER_EMAIL';
export const FORM_APPROVER_PHONE = 'FORM_APPROVER_PHONE';
export const FORM_APPROVER_SAM = 'FORM_APPROVER_SAM';

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
export const FORM_EXPIRE_DATE = 'expirationDateUtc';
export const FORM_APPROVAL_DATE_SUP = 'supervisorApprovalTimestampUtc';
export const FORM_APPROVAL_DATE_REC = 'receiverAgreementTimestampUtc';
export const FORM_APPROVAL_DATE_SEC = 'securityApprovalTimestampUtc';
// Accept Terms and conditions
export const FORM_SECURITY_NAME = 'securityApproverFullName';
export const FORM_SECURITY_TIME = 'securityApprovalTimestampUtc';
export const FORM_TERMS = 'receiverAgreementTimestampUtc';
export const FORM_TERMS_SUP = 'supervisorApprovalTimestampUtc';
// INTERNAL ONLY, placeholder for users aggreement to terms and conditions
export const FORM_TERMS_NAME_REC = 'srecipientTerms';
export const FORM_TERMS_NAME_SUP = 'supervisorTerms';
export const FORM_MODIFIED_DATE = 'mostRecentModifiedDateUtc';
// Sam accounts
export const FORM_SAM_SUBMIT = 'submitterSamAccount';
export const FORM_SAM_RECEIVE = 'receiverSamAccount';
export const FORM_SAM_SUPER = 'supervisorSamAccount';// direct supervisor
export const FORM_SAM_MANAGER = 'supervisorsSupervisorSamAccount';// supervisor's manager
// submission info
export const FORM_SUBMIT_EMAIL = 'submitterEmail';
export const FORM_REJECT_REASON = 'cancellationReason';
export const FORM_IS_ESCALATED = 'isElevatedToSupervisorsSupervisor';
export const FORM_CHANGE_REASON = "securityChangeRequestReason";
export const FORM_PDF = "approvalPdf";

/**
 * Justifications
 */
export const JUSTIFICATIONS = "justifications";
export const JUSTIFICATIONS_GC_DOCK = 'areaGoldCampDock';
export const JUSTIFICATIONS_GC_TMS = 'areaTenantManagedSpace';
export const JUSTIFICATIONS_TRAINING_ROOM = 'areaTrainingCenter';
export const JUSTIFICATIONS_OTHER = 'areaOther';
export const JUSTIFICATIONS_CHANGE_ACCESS = 'reasonChangeAcess';
export const JUSTIFICATIONS_24_HOURS = 'allHoursPerDay';

///////////////////////////////////////////////////////////////////
// RADIO BUTTONS
///////////////////////////////////////////////////////////////////
/**
 * options for access requirements
 */
 export const OPTIONS_AREA = [
   { name: "Office"},
   { name: "Gold Camp" },
   { name: "Gold Camp - Dock", justification: JUSTIFICATIONS_GC_DOCK },
   { name: "Gold Camp - Computer Room (Raised Floor)"},
   { name: "Gold Camp - Tenant Managed Space (TMS-p)", justification: JUSTIFICATIONS_GC_TMS },
   { name: "Prospect Green"},
   { name: "Croydon Warehouse"},
   { name: "Extended Current Access"},
   { name: "Training Center (24/7)", justification: JUSTIFICATIONS_TRAINING_ROOM },
   { name: "Other Area", justification: JUSTIFICATIONS_OTHER }
 ];

 export const OPTIONS_REASON = [
   { name: "New Employee"},
   { name: "Student / Intern"},
   { name: "Vendor / Contractor"},
   { name: "Badge Replacement"},
   { name: "Change Access", justification: JUSTIFICATIONS_CHANGE_ACCESS }
 ];

 export const OPTIONS_HOURS = [
   { name: "Weekdays (6am - 7pm)" },
   { name: "24 hours / Day", justification: JUSTIFICATIONS_24_HOURS }
 ];

/**
 * Form status codes
 */
export const STATUS_ERROR = 0;
export const STATUS_PEND_MGR = 1;
export const STATUS_PEND_REC = 2;
export const STATUS_PEND_SEC = 3;
export const STATUS_APPROVED = 4;
export const STATUS_CANCEL_SUB = 5;
export const STATUS_CANCEL_MGR = 6;
export const STATUS_CANCEL_REC = 7;
export const STATUS_CANCEL_SEC = 8;
export const STATUS_NAMES = [
  'Unknown State',
  'Waiting Supervisor Approval',
  'Waiting Recipient Approval',
  'Waiting Security Approval',
  'Approved',
  'Cancelled by Submitter',
  'Cancelled by Supervisor',
  'Cancelled by Recipient',
  'Cancelled by Security'
];
/**
 * Group previous request status
 */
export const PREVIOUS_REQUEST_NONE = 0;
export const PREVIOUS_REQUEST_ACTIVE = 1;
export const PREVIOUS_REQUEST_COMPLETED = 2;


/**
 * USER ROLES
 */
export const ROLE_USERS = 'User';
export const ROLE_MANAGER = 'Manager';
export const ROLE_SECURITY = 'Security';
export const ROLE_GUARD = 'Guard';
export const ROLE_RECIPIENT = 'Recipient';

/**
 * User Info (employee directory / jwt)
 */
export const ED_MANAGER_SAM = 'managerSamAccount';
export const USER_ROLE = 'role';
export const USER_NAME = 'fullName';
export const USER_SAM = 'samAccount';
export const USER_PHONE = 'deskPhone';
export const USER_CELL = 'cellPhone';
export const USER_EMAIL = 'email';
export const USER_NAME_MANAGER = 'manager';
export const USER_SAM_MANAGER = 'managerSamAccount';
export const USER_IS_MANAGER = 'isManager';
