/**
 * FieldInput.js
 * renders a redux-form field
 * see http://redux-form.com/6.5.0/examples/wizard/ for example
 * and https://github.com/erikras/redux-form/issues/1037 for bootstrap sepcific
 */
// imported libraries
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Label
} from 'react-bootstrap';
// common compnents
import FieldInput from '../../common/FieldInput';
import * as KEYS from '../../../store/keyMap';

const FormMainCompany = ({ fieldsDisabled, allDisabled, singleLine }) => {
  let width = singleLine
    ? 3
    : 6;
  let offset = singleLine
    ? 0
    : 3;
  return (
    <Row>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Company Name"
          name={KEYS.FORM_COMPANY}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_COMPANY]}
          component={FieldInput}
          type="text"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Company Address"
          name={KEYS.FORM_COMPANY_ADDRESS}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_COMPANY_ADDRESS]}
          component={FieldInput}
          type="text"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Divison"
          name={KEYS.FORM_DIVISION}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_DIVISION]}
          component={FieldInput}
          type="text"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Unit / Project"
          name={KEYS.FORM_UNIT}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_UNIT]}
          component={FieldInput}
          type="text"
          required={!allDisabled}/>
      </Col>
    </Row>
  );
};

FormMainCompany.propTypes = {
  fieldsDisabled: PropTypes.bool,
  allDisabled: PropTypes.func,
  singleLine: PropTypes.func
}

export default FormMainCompany;
