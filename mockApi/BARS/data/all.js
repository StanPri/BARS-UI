var KEYS = require('../constants');
var    _       = require('lodash');

var roles = ['User', 'Manager', 'Security'];
var types = ['Submitter', 'Recipient', 'Approver', 'Security'];

var num_requests = 8; // one for each status type

var data = [];
var uuid = 0;
for (var i = 0; i < num_requests; i++) {
  for (var j = 0; j < roles.length; j++) {
    for (var jj = 0; jj < roles.length; jj++) {
      for (var k = 0; k < types.length; k++) {
        data.push({
          [KEYS.FORM_ID]: `${uuid}`,
          [KEYS.FORM_STATUS]: `${i}`,
          [KEYS.FORM_NAME]: `${roles[j]} ${roles[jj]} ${types[k]}`,
          [KEYS.FORM_PHONE]: `workPhoneNumber ${uuid}`,
          [KEYS.FORM_CELL]: `cellPhoneNumber${uuid}`,
          [KEYS.FORM_EMAIL]: `receiverEmail${uuid}`,
          [KEYS.FORM_LICENSE]: `licensePlate${uuid}`,
          [KEYS.FORM_COMPANY]: `company${uuid}`,
          [KEYS.FORM_COMPANY_ADDRESS]: `companyAddress${uuid}`,
          [KEYS.FORM_SUP_NAME]: `${roles[(j + 1) % roles.length]} ${roles[(jj + 1) % roles.length]} ${types[(k + 1) % types.length]}`,
          [KEYS.FORM_SUP_EMAIL]: `supervisorEmail${uuid}`,
          [KEYS.FORM_SUP_PHONE]: `supervisorPhone${uuid}`,
          [KEYS.FORM_DIVISION]: `division${uuid}`,
          [KEYS.FORM_UNIT]: `unitOrProject${uuid}`,
          [KEYS.FORM_REQUEST_DATE]: `CreatedDateUtc${uuid}`,
          [KEYS.FORM_AREAS]: `accessAreas${uuid}`,
          [KEYS.FORM_HOURS]: `accessHours${uuid}`,
          [KEYS.FORM_LEVELS]: `accessLevels${uuid}`,
          [KEYS.FORM_AREA_OTHER]: `accessOtherArea${uuid}`,
          [KEYS.FORM_REASON]: `accessReason${uuid}`,
          [KEYS.FORM_VENDOR_START]: `VendorStartDateUtc${uuid}`,
          [KEYS.FORM_VENDOR_END]: `VendorEndDateUtc${uuid}`,
          [KEYS.FORM_KEYCARD]: `keycard${uuid}`,
          [KEYS.FORM_ISSUE]: `issueDateUtc${uuid}`,
          [KEYS.FORM_EXPIRE_DATE]: `expirationDateUtc${uuid}`,
          [KEYS.FORM_APPROVAL_DATE_SUP]: ``,
          [KEYS.FORM_APPROVAL_DATE_REC]: ``,
          [KEYS.FORM_APPROVAL_DATE_SEC]: ``,
          [KEYS.FORM_SAM_SUBMIT]: `SAM : ${roles[j]} ${roles[jj]} ${types[k]}`,
          [KEYS.FORM_SAM_RECEIVE]: `SAM : ${roles[j]} ${roles[jj]} ${types[k]}`,
          [KEYS.FORM_SAM_SUPER]: `SAM : ${roles[(j + 1) % roles.length]} ${roles[(jj + 1) % roles.length]} ${types[(k + 1) % types.length]}`
        });
        uuid++;
      }
    }
  }
}

exports.getAll = function() {
  console.log("GET ALL : ", data);
  return data;
}

// requests for users are involved but not in state to approve -> is submitter
// but not manager or recipient -> is approver and not in approval state -> is
// recipient and not in recipient state
exports.GetRequestsForSelf = function(_role, type) {
  role = _role.split(',');
  return data.filter(i =>
    (i[KEYS.FORM_SAM_SUBMIT] === `SAM : ${roles[0]} ${role[1]} ${type}` &&
    !(i[KEYS.FORM_SUP_NAME] === `${role[0]} ${role[1]} ${type}` ||
      i[KEYS.FORM_NAME] === `${role[0]} ${role[1]} ${type}`)) ||
    (+ i[KEYS.FORM_STATUS] !== 1 && i[KEYS.FORM_SUP_NAME] === `${role[0]} ${role[1]} ${type}`) ||
    (+ i[KEYS.FORM_STATUS] !== 2 && i[KEYS.FORM_NAME] === `${role[0]} ${role[1]} ${type}`)
  );
}

// requests that require approval -> is approver and in manager approval state
// -> is recipient and in recipient approval state -> is security role and in
// security approval state, but not recipent
exports.GetRequestsNeedingApproval = function(_role, type) {
  role = _role.split(',');
  return data.filter(i =>
    (+ i[KEYS.FORM_STATUS] === 1 && i[KEYS.FORM_SUP_NAME] === `${role[0]} ${role[1]} ${type}`) ||
    (+ i[KEYS.FORM_STATUS] === 2 && i[KEYS.FORM_NAME] === `${role[0]} ${role[1]} ${type}`) ||
    (+ i[KEYS.FORM_STATUS] === 3 && _.contains(role, roles[2]) && !(i[KEYS.FORM_NAME] === `${role[0]} ${role[1]} ${type}`))
  );
}
