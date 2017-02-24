import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
// compnents
import FieldInput from '../common/FieldInput';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

const levelsOptions = ['Access1', 'Access2', 'Access3'];

// TODO: DATES! https://github.com/erikras/redux-form/issues/1536
// https://github.com/jquense/react-widgets/blob/master/src/DateTimePicker.jsx

const FormSecurity = ({allDisabled}) => (
  <div>
    <Row>
      <Col sm={6} md={3}>
        <Field
          label="Access Level"
          name={KEYS.FORM_LEVELS}
          disabled={allDisabled}
          component={FieldInput}
          type="text"/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          label="Issue Date"
          name={KEYS.FORM_ISSUE}
          disabled={allDisabled}
          component={FieldInput}
          type="date"/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          label="Expiration Date"
          name={KEYS.FORM_EXPIRE_DATE}
          disabled={allDisabled}
          component={FieldInput}
          type="date"/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          label="Keycard No."
          name={KEYS.FORM_KEYCARD}
          disabled={allDisabled}
          component={FieldInput}
          type="text"/>
      </Col>
    </Row>
    <Row>
      <Col sm={6} md={9}>
        <Field
          label="Security Approver Name"
          name={KEYS.FORM_SECURITY_NAME}
          disabled={allDisabled}
          component={FieldInput}
          type="text"/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          label="Approval Date"
          name={KEYS.FORM_APPROVAL_DATE_SEC}
          disabled={allDisabled}
          component={FieldInput}
          type="date"/>
      </Col>
    </Row>
  </div>
);

FormSecurity.propTypes = {
  allDisabled: PropTypes.bool
};

export default FormSecurity;
