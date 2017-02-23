import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import * as KEYS from '../../store/keyMap';

const levelsOptions = ['Access1', 'Access2', 'Access3'];

const FormSecurity = ({allDisabled}) => (
  <div>
    <Row>
      <Col sm={6} md={3}>
        <Field
          component={FormSelect}
          name={KEYS.FORM_LEVELS}
          multiple="multiple"
          label="Access Levels"
          options={levelsOptions}
          disabled={allDisabled}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_ISSUE}
          label="Issue Date"
          type="date"
          disabled={allDisabled}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_EXPIRE_DATE}
          label="Expiration Date"
          type="date"
          disabled={allDisabled}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_KEYCARD}
          label="Keycard No."
          disabled={allDisabled}/>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <Field
          component={FormInput}
          name={KEYS.FORM_SECURITY_NAME}
          label="Security Approver Name"
          disabled={allDisabled}/>
      </Col>
      <Col xs={6}>
        <Field
          component={FormInput}
          name={KEYS.FORM_APPROVAL_DATE_SEC}
          label="Approval Date"
          type="date"
          disabled={allDisabled}/>
      </Col>
    </Row>
  </div>
);

FormSecurity.propTypes = {
  allDisabled: PropTypes.bool
};

export default FormSecurity;
