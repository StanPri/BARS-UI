import * as KEYS from '../store/keyMap';

const apr_ids = ['apr1', 'apr2', 'apr3', 'apr4'];
const req_ids = ['req1', 'req2', 'req4', 'req4'];

export const MOCK_lists = {
  [KEYS.LIST_APPROVALS]: {
    byId: {
      [apr_ids[0]]: {
        id: apr_ids[0],
        replace_with_data: 'replace_with_data'
      },
      [apr_ids[1]]: {
        id: apr_ids[1],
        replace_with_data: 'replace_with_data'
      },
      [apr_ids[2]]: {
        id: apr_ids[2],
        replace_with_data: 'replace_with_data'
      },
      [apr_ids[3]]: {
        id: apr_ids[3],
        replace_with_data: 'replace_with_data'
      }
    },
    allIds: [...apr_ids]
  },
  [KEYS.LIST_REQUESTS]: {
    byId: {
      [req_ids[0]]: {
        id: req_ids[0],
        replace_with_data: 'replace_with_data'
      },
      [req_ids[1]]: {
        id: req_ids[1],
        replace_with_data: 'replace_with_data'
      },
      [req_ids[2]]: {
        id: req_ids[2],
        replace_with_data: 'replace_with_data'
      },
      [req_ids[3]]: {
        id: req_ids[3],
        replace_with_data: 'replace_with_data'
      }
    },
    allIds: [...req_ids]
  }
};
