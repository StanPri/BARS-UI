var KEYS = require(`../constants`);

var roles = [`User`, `Manager`, `Security`];
var types = [`Submitter`, `Recipient`, `Approver`, `Security`];

var data = [];
var uuid = 0;
for (var j = 0; j < roles.length; j++) {
    for (var k = 0; k < types.length; k++) {
        data.push({
            [KEYS.USER_SAM]: `SAM : ${roles[j]} ${types[k]}`,
            [KEYS.USER_CAMPUS]: `campus${uuid}`,
            [KEYS.USER_CELLPHONE]: `cellPhone${uuid}`,
            [KEYS.USER_CLASSIFICAITON]: `classification${uuid}`,
            [KEYS.USER_DESKLOCATION]: `deskLocation${uuid}`,
            [KEYS.USER_DESKPHONE]: `deskPhone${uuid}`,
            [KEYS.USER_EMAIL]: `email${uuid}`,
            [KEYS.USER_EMPLOYEENUMBER]: `employeeNumber${uuid}`,
            [KEYS.USER_FAX]: `faxNumber${uuid}`,
            [KEYS.USER_FIRESTNAME]: `firstName${uuid}`,
            [KEYS.USER_FULLNAME]: `${roles[j]} ${types[k]}`,
            [KEYS.USER_GROUP]: `group${uuid}`,
            [KEYS.USER_LASTNAME]: `lastName${uuid}`,
            [KEYS.USER_MAILSTOP]: `mailStop${uuid}`,
            [KEYS.USER_MANAGER_SAM]: `SAM : ${roles[(j + 1) % roles.length]} ${types[(k + 1) % types.length]}`,
            [KEYS.USER_MANAGER]: `${roles[(j + 1) % roles.length]} ${types[(k + 1) % types.length]}`,
            [KEYS.USER_UNIT]: `reportingUnit${uuid}`,
            [KEYS.USER_ISMANAGER]: `${k === 2 || j === 1 ? 1 : 0}`
        });
        uuid++;
    }
}

exports.getAll = function() {
    return data;
}
