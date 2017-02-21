var KEYS = require(`../constants`);

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

exports.data = data;
exports.getAll = function() {
  return data;
}
