import {MOCK_user} from '../MOCK/user';
import {MOCK_lists} from '../MOCK/lists';
import * as KEYS from '../store/keyMap';

// current sets mock data on load here
export default {
  records: [],
  form : {},
  formPage : {},
  user : MOCK_user,
  lists : MOCK_lists,
  items : [],
  fetchCallsInProgress : 0
};
