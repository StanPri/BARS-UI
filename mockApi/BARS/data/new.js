var KEYS = require('../constants');
var    _       = require('lodash');

var time = "2017-02-09T23:51:09.389Z";
var data = [];
var num_states = 8;
for (var i=0; i< num_states; i++) {
  data.push({
    "id": `${i}`,
    "receiverSamAccount": "TDC\\ryan.vollmer",
    "supervisorSamAccount": "TDC\\chris.kummer",
    "submitterSamAccount": "TDC\\ryan.vollmer",
    "requestState": i,
    "createdDateUtc": `${i > 0 ? time : ''}`,
    "mostRecentModifiedDateUtc": `${time}`,
    "modifiedBySamAccount": "TDC\\ryan.vollmer",
    "fullName": "Ryan Vollmer",
    "workPhoneNumber": "1231231231",
    "cellPhoneNumber": "1231231230",
    "licensePlate": "ryan_lic_1",
    "companyName": "ryan_comp_1",
    "companyAddress": "ryan_comp_1",
    "division": "ryan_div_1",
    "unitOrProject": "ryan_unit_1",
    "receiverEmail": "ryan_email",
    "supervisorEmail": "chris_email",
    "supervisorName": "Chris Kummer",
    "supervisorPhoneNumber": "999888777",
    "accessReason": "1",
    "accessHours": 2,
    "accessAreas": ["access_area_1"],
    "accessOtherArea": "other_area_reason",
    "vendorStartDateUtc": `${i > 0 ? time : ''}`,
    "vendorEndDateUtc": `${i > 0 ? time : ''}`,
    "accessLevels": [1],
    "issueDateUtc": `${i > 4 ? time : ''}`,
    "expirationDateUtc": `${i > 4 ? time : ''}`,
    "keycard": `${i > 3 ? 'ryan_key_card' : ''}`,
    "securityApproverName": `${i > 3 ? 'sec_approver_name' : ''}`,
    "supervisorApprovalTimestampUtc": `${i > 1 ? time : ''}`,
    "receiverAgreementTimestampUtc": `${i > 2 ? time : ''}`,
    "securityApprovalTimestampUtc": `${i > 3 ? time : ''}`
  });
}

for (var i=0; i< num_states; i++) {
  data.push({
    "id": `${i + num_states}`,
    "receiverSamAccount": "TDC\\chris.kummer",
    "supervisorSamAccount": "TDC\\van.vo",
    "submitterSamAccount": "TDC\\van.vo",
    "requestState": i,
    "createdDateUtc": `${i > 0 ? time : ''}`,
    "mostRecentModifiedDateUtc": `${time}`,
    "modifiedBySamAccount": "TDC\\van.vo",
    "fullName": "Chris Kummer",
    "workPhoneNumber": "1231231231",
    "cellPhoneNumber": "1231231230",
    "licensePlate": "chris_lic_1",
    "companyName": "chris_comp_1",
    "companyAddress": "chris_comp_1",
    "division": "chris_div_1",
    "unitOrProject": "chris_unit_1",
    "receiverEmail": "chris_email",
    "supervisorEmail": "chris_email",
    "supervisorName": "Van Vo",
    "supervisorPhoneNumber": "999888777",
    "accessReason": "1",
    "accessHours": 2,
    "accessAreas": ["access_area_1"],
    "accessOtherArea": "other_area_reason",
    "vendorStartDateUtc": `${i > 0 ? time : ''}`,
    "vendorEndDateUtc": `${i > 0 ? time : ''}`,
    "accessLevels": [1],
    "issueDateUtc": `${i > 4 ? time : ''}`,
    "expirationDateUtc": `${i > 4 ? time : ''}`,
    "keycard": `${i > 3 ? 'chris_key_card' : ''}`,
    "securityApproverName": `${i > 3 ? 'sec_approver_name' : ''}`,
    "supervisorApprovalTimestampUtc": `${i > 1 ? time : ''}`,
    "receiverAgreementTimestampUtc": `${i > 2 ? time : ''}`,
    "securityApprovalTimestampUtc": `${i > 3 ? time : ''}`
  });
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
