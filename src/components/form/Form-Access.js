// libraries
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
// compnents
import RadioGroup from '../common/RadioGroup';
import CheckBoxGroup from '../common/CheckBoxGroup';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

const areaOptions = [
  { name: "Office" },
  { name: "Gold Camp" },
  { name: "Gold Camp - Dock", justification: 1 },
  { name: "Gold Camp - Computer Room (Raised Floor)" },
  { name: "Gold Camp - Tenant Managed Space (TMS-p)", justification: 1 },
  { name: "Prospect Green" },
  { name: "Croydon Warehouse" },
  { name: "Extended Current Access" },
  { name: "Training Center (24/7)", justification: 1 },
  { name: "Other Area", justification: 1 }
];

const reasonOptions = [
  { name: "New Employee", },
  { name: "Student / Intern" },
  { name: "Vendor / Contractor" },
  { name: "Badge Replacement" },
  { name: "Change Access", justification: 1 }
];

const hoursOptions = [
  { name: "Weekdays (6am - 7pm)" },
  { name: "24 hours / Day", justification: 1 }
];

/**
 * Displays Access Requirements seciton of form
 * @param {bool} allDisabled    - determines if fields are editable
 */
const FormAccess = ({ allDisabled }) => {
  let width = 4;
  let offset = 0;
  return (
    <Row>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Reason"
          name={KEYS.FORM_REASON}
          disabled={allDisabled}
          options={reasonOptions}
          component={RadioGroup}
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Areas"
          name={KEYS.FORM_AREAS}
          disabled={allDisabled}
          options={areaOptions}
          component={CheckBoxGroup}
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Hours"
          name={KEYS.FORM_HOURS}
          disabled={allDisabled}
          options={hoursOptions}
          component={RadioGroup}
          required={!allDisabled}/>
      </Col>
    </Row>
  );
};

FormAccess.propTypes = {
  allDisabled: PropTypes.bool
};

export default FormAccess;
