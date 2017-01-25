import * as KEYS from '../store/keyMap';

const roles = ['manager', 'security', 'recipient'];

export const MOCK_user = {
  [KEYS.USER_ROLE]: roles[1],
  [KEYS.USER_IS_VENDOR]: true
};
