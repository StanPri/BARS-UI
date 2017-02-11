var KEYS = require(`../constants`);

/*
var roles = [`User`, `Manager`, `Security`];
var types = [`Submitter`, `Recipient`, `Approver`, `Security`];

var data = [];
var uuid = 0;
for (var j = 0; j < roles.length; j++) {
  for (var jj = 0; jj < roles.length; jj++) {
    for (var k = 0; k < types.length; k++) {
        data.push({
            [KEYS.USER_SAM]: `SAM : ${roles[j]} ${roles[jj]} ${types[k]}`,
            // [KEYS.USER_CAMPUS]: `campus${uuid}`,
            [KEYS.USER_CELLPHONE]: `cellPhone${uuid}`,
            // [KEYS.USER_CLASSIFICAITON]: `classification${uuid}`,
            // [KEYS.USER_DESKLOCATION]: `deskLocation${uuid}`,
            [KEYS.USER_DESKPHONE]: `deskPhone${uuid}`,
            [KEYS.USER_EMAIL]: `email${uuid}`,
            // [KEYS.USER_EMPLOYEENUMBER]: `employeeNumber${uuid}`,
            // [KEYS.USER_FAX]: `faxNumber${uuid}`,
            // [KEYS.USER_FIRESTNAME]: `firstName${uuid}`,
            [KEYS.USER_FULLNAME]: `${roles[j]} ${roles[jj]} ${types[k]}`,
            // [KEYS.USER_GROUP]: `group${uuid}`,
            // [KEYS.USER_LASTNAME]: `lastName${uuid}`,
            // [KEYS.USER_MAILSTOP]: `mailStop${uuid}`,
            [KEYS.USER_MANAGER_SAM]: `SAM : ${roles[(j + 1) % roles.length]} ${roles[(jj + 1) % roles.length]} ${types[(k + 1) % types.length]}`,
            [KEYS.USER_MANAGER]: `${roles[(j + 1) % roles.length]} ${roles[(jj + 1) % roles.length]} ${types[(k + 1) % types.length]}`,
            // [KEYS.USER_UNIT]: `reportingUnit${uuid}`,
            [KEYS.USER_ISMANAGER]: `${k === 2 || j === 1 || jj === 1 ? 1 : 0}`
        });
        uuid++;
    }
  }
}
*/

let data = [
  {
    [KEYS.USER_SAM]: `TDC\\chris.kummer`,
    [KEYS.USER_CELLPHONE]: `999888777`,
    [KEYS.USER_DESKPHONE]: `999888000`,
    [KEYS.USER_EMAIL]: `chris_email`,
    [KEYS.USER_FULLNAME]: `Chris Kummer`,
    [KEYS.USER_MANAGER_SAM]: `TDC\\van.vo`,
    [KEYS.USER_MANAGER]: `Van Vo`,
    [KEYS.USER_ISMANAGER]: 1
  }, {
    [KEYS.USER_SAM]: `TDC\\van.vo`,
    [KEYS.USER_CELLPHONE]: `888888777`,
    [KEYS.USER_DESKPHONE]: `888888000`,
    [KEYS.USER_EMAIL]: `van_email`,
    [KEYS.USER_FULLNAME]: `Van Vo`,
    [KEYS.USER_MANAGER_SAM]: `TDC\\van.vo`,
    [KEYS.USER_MANAGER]: `Van Vo`,
    [KEYS.USER_ISMANAGER]: 1
  }, {
    [KEYS.USER_SAM]: `TDC\\ryan.vollmer`,
    [KEYS.USER_CELLPHONE]: `777888777`,
    [KEYS.USER_DESKPHONE]: `777888000`,
    [KEYS.USER_EMAIL]: `ryan_email`,
    [KEYS.USER_FULLNAME]: `Ryan Vollmer`,
    [KEYS.USER_MANAGER_SAM]: `TDC\\van.vo`,
    [KEYS.USER_MANAGER]: `Van Vo`,
    [KEYS.USER_ISMANAGER]: 0
  }
];

exports.getAll = function() {
  return data;
}
