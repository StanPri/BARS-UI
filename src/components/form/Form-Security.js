import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import * as KEYS from '../../store/keyMap';

const FormSecurity = ({disabled}) => (
  <Row>
    <Col xs={12}>
      <h2>
        Approvals
        <Button><Glyphicon glyph="question-sign"/></Button>
      </h2>
    </Col>
    <Col sm={6} md={3}>
      <Field
        component={FormSelect}
        name={KEYS.FORM_LEVELS}
        multiple="multiple"
        label="Access Levels"
        options={['Access1', 'Access2', 'Access3']}
        disabled={disabled}/>
    </Col>
    <Col sm={6} md={3}>
      <Field
        component={FormInput}
        name={KEYS.FORM_ISSUE}
        label="Issue Date"
        type="date"
        disabled={disabled}/>
    </Col>
    <Col sm={6} md={3}>
      <Field
        component={FormInput}
        name={KEYS.FORM_EXPIRE_DATE}
        label="Expiration Date"
        type="date"
        disabled={disabled}/>
    </Col>
    <Col sm={6} md={3}>
      <Field
        component={FormInput}
        name={KEYS.FORM_KEYCARD}
        label="Keycard No."
        type="number"
        disabled={disabled}/>
    </Col>
    <Col xs={12}>
      <Field
        component={FormInput}
        name="section_3_admin_name"
        label="Admin Name"
        disabled={disabled}/>
    </Col>
  </Row>
);

FormSecurity.propTypes = {
  disabled: PropTypes.bool.isRequired
};

export default FormSecurity;
