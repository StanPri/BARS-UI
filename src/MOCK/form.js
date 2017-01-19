import {MOCK_rows_apr} from './rows';
import * as KEYS from '../store/keyMap';

const entry = 0; // maps this index of entry from mock row

export const MOCK_form = {
  [KEYS.FORM_ID]: MOCK_rows_apr[entry][KEYS.FORM_ID],
  [KEYS.FORM_STATUS]: MOCK_rows_apr[entry][KEYS.FORM_STATUS],
  [KEYS.FORM_NAME]: MOCK_rows_apr[entry][KEYS.FORM_NAME],
  [KEYS.FORM_PHONE]: MOCK_rows_apr[entry][KEYS.FORM_PHONE],
  [KEYS.FORM_CELL]: "CELL 1",
  [KEYS.FORM_LICENSE]: "LICENSE 1",
  [KEYS.FORM_EMAIL]: MOCK_rows_apr[entry][KEYS.FORM_EMAIL],
  [KEYS.FORM_COMPANY]: "COMPANY 1",
  [KEYS.FORM_COMPANY_ADDRESS]: "COMPANY ADDRESS 1",
  [KEYS.FORM_SUP_NAME]: MOCK_rows_apr[entry][KEYS.FORM_SUP_NAME],
  [KEYS.FORM_SUP_PHONE]: MOCK_rows_apr[entry][KEYS.FORM_SUP_PHONE],
  [KEYS.FORM_SUP_EMAIL]: MOCK_rows_apr[entry][KEYS.FORM_SUP_EMAIL],
  [KEYS.FORM_REQUEST_DATE]: "REQUEST DATE 1",
  [KEYS.FORM_DIVISION]: "DIVISION 1",
  [KEYS.FORM_UNIT]: "UNIT 1",
  [KEYS.FORM_REASON]: "REASON 1",
  [KEYS.FORM_HOURS]: "HOURS 1",
  [KEYS.FORM_AREAS]: ["AREA1", "AREA2"],
  [KEYS.FORM_VENDOR_START]: ["VENDOR START 1"],
  [KEYS.FORM_VENDOR_END]: ["VENDOR END 1"],
};
