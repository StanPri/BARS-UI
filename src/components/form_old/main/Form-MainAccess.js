/**
 * renderField.js
 * renders a redux-form field
 * see http://redux-form.com/6.5.0/examples/wizard/ for example
 * and https://github.com/erikras/redux-form/issues/1037 for bootstrap sepcific
 */
// imported libraries
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Row, Col, FormGroup, ControlLabel, HelpBlock, Label } from 'react-bootstrap';
// common compnents
import RadioGroup from '../../common/RadioGroup';
import CheckBoxGroup from '../../common/CheckBoxGroup';
import * as KEYS from '../../../store/keyMap';

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
  { name: "Vendor / Contractork" },
  { name: "Badge Replacement" },
  { name: "Change Access", justification: 1 }
];

const hoursOptions = [
  { name: "Weekdays (6am - 7pm)" },
  { name: "24 hours / Day", justification: 1 }
];

const FormMainApprover = ({ allDisabled }) => {
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

export default FormMainApprover;
