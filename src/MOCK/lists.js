import {MOCK_rows_apr, MOCK_rows_req} from './rows';
import * as KEYS from '../store/keyMap';

// http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
export const MOCK_lists = {
  [KEYS.LIST_APPROVALS]: {
    byId: {
      [MOCK_rows_apr[0].id]: MOCK_rows_apr[0],
      [MOCK_rows_apr[1].id]: MOCK_rows_apr[1],
      [MOCK_rows_apr[2].id]: MOCK_rows_apr[2],
      [MOCK_rows_apr[3].id]: MOCK_rows_apr[3],
    },
    allIds: [MOCK_rows_apr[0].id, MOCK_rows_apr[1].id, MOCK_rows_apr[2].id, MOCK_rows_apr[3].id]
  },
  [KEYS.LIST_REQUESTS]: {
    byId: {
      [MOCK_rows_req[0].id]: MOCK_rows_req[0],
      [MOCK_rows_req[1].id]: MOCK_rows_req[1],
      [MOCK_rows_req[2].id]: MOCK_rows_req[2],
      [MOCK_rows_req[3].id]: MOCK_rows_req[3],
    },
    allIds: [MOCK_rows_req[0].id, MOCK_rows_req[1].id, MOCK_rows_req[2].id, MOCK_rows_req[3].id]
  },
};
