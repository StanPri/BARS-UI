/**
 * BARS key map
 */
module.exports = exports.KEYS = {
  FORM_ID: 'id',
  FORM_STATUS: 'requestState',
  // Applicatnt Information /////////////////
  // FORM_NAME: 'fullName',
  // //TODO!!!!!!!!!!!!!!!!!
  FORM_NAME_F: 'firstName',
  FORM_NAME_L: 'lastName',
  FORM_PHONE: 'workPhoneNumber',
  FORM_CELL: 'cellPhoneNumber',
  FORM_EMAIL: 'receiverEmail',
  FORM_LICENSE: 'licensePlate',
  FORM_COMPANY: 'companyName',
  FORM_COMPANY_ADDRESS: 'companyAddress',
  ///////////////////FORM_SUP_NAME: 'supervisorName', //TODO!!!!!!!!!!!!!!!!!
  FORM_SUP_NAME_F: 'supervisorFirstName',
  FORM_SUP_NAME_L: 'supervisorLastName',

  FORM_SUP_EMAIL: 'supervisorEmail',
  FORM_SUP_PHONE: 'supervisorPhoneNumber',
  FORM_DIVISION: 'division',
  FORM_UNIT: 'unitOrProject',
  ////////////////////FORM_REQUEST_DATE: 'CreatedDateUtc', Access Requirements
  FORM_AREAS: 'accessAreas',
  FORM_HOURS: 'accessHours',
  FORM_LEVELS: 'accessLevels',
  FORM_AREA_OTHER: 'accessOtherArea',
  FORM_REASON: 'accessReason',
  // Vendor Section
  FORM_VENDOR_START: 'vendorStartDateUtc',
  FORM_VENDOR_END: 'vendorEndDateUtc',
  // Approvals
  FORM_KEYCARD: 'keycard',
  FORM_ISSUE: 'issueDateUtc',
  FORM_EXPIRE_DATE: 'expirationDateUtc',
  FORM_SEC_NAME: 'securityApproverName',
  // //////////////////FORM_APPROVAL_DATE_SUP: 'supervisorApprovalTimestampUtc',
  // //////////////////FORM_APPROVAL_DATE_REC: 'receiverAgreementTimestampUtc',
  // //////////////////FORM_APPROVAL_DATE_SEC: 'securityApprovalTimestampUtc', Sam
  // accounts
  FORM_SAM_SUBMIT: 'submitterSamAccount',
  FORM_SAM_RECEIVE: 'receiverSamAccount',
  FORM_SAM_SUPER: 'supervisorSamAccount'
};
