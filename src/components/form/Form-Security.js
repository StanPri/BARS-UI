import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
// compnents
import FieldInput from '../common/FieldInput';
import DatePicker from '../common/FieldDate';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays security section of form
 * @param {bool} allDisabled    - determines if all fields should be disabled
 */
const FormSecurity = ({allDisabled}) => {
  let widthSm = allDisabled
    ? 6
    : 12;
  let widthMd = allDisabled
    ? 9
    : 12;
  return (
    <div>
      <Row>
        <Col sm={12}>
          <Field label="Security Approver Name" name={KEYS.FORM_SECURITY_NAME} disabled={allDisabled} component={FieldInput} type="text" required={!allDisabled}/>
        </Col>
      </Row>
      {allDisabled && <Row>
        <Col sm={6}>
          <Field label="Expiration Date" name={KEYS.FORM_EXPIRE_DATE} disabled={allDisabled} component={DatePicker} required={!allDisabled}/>
        </Col>
        <Col sm={6}>
          <Field label="Approval Date" name={KEYS.FORM_APPROVAL_DATE_SEC} disabled={allDisabled} component={DatePicker}/>
        </Col>
      </Row>}
    </div>
  );
};

FormSecurity.propTypes = {
  allDisabled: PropTypes.bool
};

export default FormSecurity;
